/*jslint */
/*global module, require */

// todo: in typescript.js replace
// var extendsEmitted      = false; => true;
// var decorateEmitted     = false; => true;
// var paramEmitted        = false; => true;

// todo: 2. сделать работу на воркерах, дочерних процесах

var fs                  = require("fs");
var path                = require("path");
var sourceMap           = require('source-map');
var colors           = require('colors');
var lock                = require("./../lock");
var deferred            = require("./../deferred");
var parallel            = require("./../parallel");
var typescript          = require("../../typescript");
var locks               = {};
var typeOf              = require("./../typeOf");
var EventEmitter        = require("events").EventEmitter;
//var cacheTypescript     = {};
var DiagnosticError     = require("./diagnosticError");
var DiagnosticFileError = require("./diagnosticFileError");
var timeStart           = Number(new Date());

var spawn = require("child_process").spawn;
var memory = require("../memory/client");

function init(callback) {
    deferred([

        function (next) {
            var proc = spawn("rm", ["-rf", "/home/rodzewich/Projects/playground/temp/typescript/memory.sock"], {cwd: process.cwd});
            proc.on("exit", function () {
                next();
            });
        },

        function (next) {
            var proc = spawn(process.execPath, ["./lib/memory/server.js", "/home/rodzewich/Projects/playground/temp/typescript/memory.sock"], {cwd: process.cwd});
            proc.stderr.on("data", function (data) {
                console.log(data.toString("utf8").red);
            });
            proc.stdout.on("data", function (data) {
                console.log(data.toString("utf8").red);
            });
            setTimeout(function () {
                next();
            }, 500);
        },

        function () {
            if (typeOf(callback) === "function") {
                callback();
            }
        }

    ]);
}


init();




function compile(options, callback) {
    "use strict";

    var filename      = options.filename,
        basedir       = options.basedir,
        useCache      = !!options.useCache,
        lockTemp      = path.join(options.lockTemp, "typescript/locks"),
        lockTimeout   = options.lockTimeout,
        scriptsTarget = options.scriptsTarget,
        files         = [];

    var client;

    var memoryFilesystem = {};

    function saveMemoryFileSystem(callback) {
        var filename;
        var result = {};
        var item;
        for (filename in memoryFilesystem) {
            if (!memoryFilesystem.hasOwnProperty(filename)) {
                continue;
            }
            item = memoryFilesystem[filename];
            if (typeOf(item.date)         === "number" &&
                typeOf(item.typescript)   === "string" &&
                typeOf(item.sourcemap)    === "string" &&
                typeOf(item.javascript)   === "string" &&
                typeOf(item.dependencies) === "array") {
                result[filename] = {
                    typescript   : item.typescript,
                    javascript   : item.javascript,
                    sourcemap    : item.sourcemap,
                    dependencies : item.dependencies,
                    date         : item.date
                };
            }
        }
        client.setItems(result, function (error) {
            callback(error || null);
        });
    }

    function process(options, callback) {

        var filename       = options.filename,
            withoutCompile = options.withoutCompile,
            resolve        = path.join(basedir, filename),
            ts             = typescript(),
            dependencies   = {},
            mtime;

        if (files.indexOf(filename) === -1) {
            files.push(filename);
        }

        function getFileReferences(filename, content, withoutDefinitions) {
            var fileReferences = [];
            ts.preProcessFile(content, false).referencedFiles.forEach(function (item) {
                var directory  = path.dirname(filename),
                    result     = path.join(directory, item.fileName),
                    additional = result.substr(-3).toLowerCase(),
                    extension  = result.substr(-3).toLowerCase();
                if (extension === ".ts" && result.substr(0, 2) !== "..") {
                    if (additional !== ".d.ts" || (additional === ".d.ts" && !withoutDefinitions)) {
                        fileReferences.push(result.substr(0, result.length - 3));
                    }
                }
            });
            return fileReferences;
        }

        function done(error, result) {
            var emitter;
            if (locks[filename]) {
                emitter = locks[filename];
                delete locks[filename];
                emitter.emit("done", error, result);
            }
            callback(error, result);
        }

        ts.sys = (function (sys) {

            return {

                args : [],

                newLine : sys.newLine,

                useCaseSensitiveFileNames : sys.useCaseSensitiveFileNames,

                write : function () {
                    var ret = sys.write.apply(this, arguments);
                    console.log("sys.write: arguments =", arguments, " return =", ret);
                    return ret;
                },

                readFile : function (filename) {

                    var extension = filename.substr(-3).toLowerCase(),
                        pathname  = path.relative(basedir, filename.substr(0, filename.length - 3));

                    if (extension === ".ts" && memoryFilesystem[pathname]) {
                        //console.log("sys.readFile(%s) = %s;", JSON.stringify(filename), JSON.stringify(memoryFilesystem[pathname].typescript));
                        return memoryFilesystem[pathname].typescript;
                    } else if (extension === ".ts" && ["lib.d", "../lib.d", "../../lib.d"].indexOf(pathname) !== -1) {
                        // todo: cache this
                        //console.log("sys.readFile(%s) = %s;", JSON.stringify(filename)/*, JSON.stringify(fs.readFileSync("lib.d.ts").toString("utf8"))*/);
                        return fs.readFileSync("lib.d.ts").toString("utf8");
                    }

                    //console.log("sys.readFile(%s) = %s;", JSON.stringify(filename), undefined);
                    return undefined;

                },

                writeFile : function (filename, content) {

                    var pathname,
                        sourcemap,
                        references,
                        source,
                        result;

                    if (filename.substr(-3).toLowerCase() === ".js") {
                        pathname = path.relative(basedir, filename.substr(0, filename.length - 3));
                        if (memoryFilesystem[pathname] && !memoryFilesystem[pathname].javascript) {
                            references = getFileReferences(pathname, content, true).map(function (element) {
                                return JSON.stringify(String(element));
                            }).join(",");
                            memoryFilesystem[pathname].javascript = [
                                "(function () {",
                                "    var adapter = xlib.utils.require.scripts;",
                                "    adapter.load([" + references + "], function (exports, require, __extends, __decorate, __metadata, __param) {",
                                "        var __module     = " + JSON.stringify(pathname) + ",",
                                "            __references = [" + references + "],",
                                "            __dirname    = " + JSON.stringify(path.relative("/", path.dirname(pathname))) + ",",
                                "            __filename   = " + JSON.stringify(filename) + ";",
                                content.split("\n").map(function (line, index, array) {
                                    return index !== array.length - 1 ? "        " + line : ""
                                }).join("\n"),
                                "        adapter.fireListeners(\"loaded\", {",
                                "            module     : __module,",
                                "            references : __references,",
                                "            dirname    : __dirname,",
                                "            filename   : __filename,",
                                "            exports    : exports",
                                "        });",
                                "    });",
                                "}());"
                            ].join("\n");
                        }
                    } else if (filename.substr(-7).toLowerCase() === ".js.map") {
                        pathname = path.relative(basedir, filename.substr(0, filename.length - 7));
                        if (memoryFilesystem[pathname] && !memoryFilesystem[pathname].sourcemap) {
                            sourcemap                           = JSON.parse(content);
                            source                              = new sourceMap.SourceMapConsumer(sourcemap);
                            result                              = new sourceMap.SourceMapGenerator();
                            source.eachMapping(function (item) {
                                result.addMapping({
                                    generated : {
                                        line   : item.generatedLine + 7, // todo: hardcode
                                        column : item.generatedColumn + 8 // todo: hardcode
                                    },
                                    source    : "/" + pathname + ".ts", // todo: hardcode
                                    original  : {
                                        line   : item.originalLine,
                                        column : item.originalColumn
                                    },
                                    name      : item.name
                                });
                            });
                            memoryFilesystem[pathname].sourcemap = result.toString();
                        }
                    }

                    /*var ret = sys.writeFile.apply(this, arguments);
                     console.log("sys.writeFile: arguments =", arguments, " return =", ret);
                     return ret;*/
                },

                watchFile : function () { // todo: ???
                    var ret = sys.watchFile.apply(this, arguments);
                    console.log("sys.watchFile: arguments =", arguments, " return =", ret);
                    return ret;
                },

                resolvePath : function () {
                    var ret = sys.resolvePath.apply(this, arguments);
                    console.log("sys.resolvePath: arguments =", arguments, " return =", ret);
                    return ret;
                },

                fileExists : function () {
                    var ret = sys.fileExists.apply(this, arguments);
                    console.log("sys.fileExists: arguments =", arguments, " return =", ret);
                    return ret;
                },

                directoryExists : function (directoryName) {
                    return true;
                },

                createDirectory : function (directoryName) {
                },

                getExecutingFilePath : function () {
                    console.log("sys.getExecutingFilePath() = %s;", JSON.stringify(basedir));
                    return basedir;
                    /*var ret = sys.getExecutingFilePath.apply(this, arguments);
                     console.log("sys.getExecutingFilePath: arguments =", arguments, " return =", ret);
                     return ret;*/
                },

                getCurrentDirectory : function () {
                    console.log("sys.getCurrentDirectory() = %s;", JSON.stringify(basedir));
                    return basedir;
                    /*var ret = sys.getCurrentDirectory.apply(this, arguments);
                     console.log("sys.getCurrentDirectory: arguments =", arguments, "return =", ret);
                     return ret;*/
                },

                readDirectory : function () {
                    var ret = sys.readDirectory.apply(this, arguments);
                    console.log("sys.readDirectory: arguments =", arguments, "return =", ret);
                    return ret;
                },

                getMemoryUsage : function () {
                    return sys.getMemoryUsage.apply(this, arguments);
                },

                exit : function () {
                }

            };

        }(ts.sys));

        var fileSystem = {};

        function readFile(filename, callback) {
            // todo: настроить одновременный доступ к файлу
            var content = fileSystem[filename],
                resolve = path.join(basedir, filename) + ".ts";
            if (content) {
                setTimeout(function () {
                    callback(null, content);
                }, 0);
            } else {
                fs.readFile(resolve, function (error, result) {
                    if (!error) {
                        fileSystem[filename] = result.toString("utf8");
                        callback(null, fileSystem[filename]);
                    } else {
                        callback(error, null);
                    }
                });
            }
        }

        var statCache = {};

        function stat(filename, callback) {
            // todo: настроить одновременный доступ к файлу
            var content = statCache[filename],
                resolve = path.join(basedir, filename) + ".ts";
            if (content) {
                setTimeout(function () {
                    callback(null, content);
                }, 0);
            } else {
                fs.stat(resolve, function (error, stats) {
                    if (!error) {
                        statCache[filename] = {
                            file     : stats.isFile(),
                            modified : parseInt(Math.max(Number(stats.mtime), timeStart).toString().slice(0, -3), 10)
                        };
                        callback(null, statCache[filename]);
                    } else {
                        callback(error, null);
                    }
                });
            }
        }

        var unlock;

        console.log("get file:", filename);

        deferred([

            // todo: deprecated
            /*function (next) {
                if (!locks[filename]) {
                    locks[filename] = new EventEmitter();
                    next();
                } else {
                    locks[filename].addListener("done", done);
                }
            },*/

            // connect to memory
            function (next) {
                client = memory({
                    socket    : "./temp/typescript/memory.sock",
                    namespace : "typescript"
                });
                // todo: skip connect
                client.connect(function (error) {
                    if (!error) {
                        console.log("Connect without errors");
                        next();
                    } else {
                        console.log("Connect with error: ", error);
                        done([error], null);
                    }
                });
            },

            // check cache
            function (next) {
                if (useCache) {
                    client.getItem(filename, function (error, response) {
                        if (!error) {
                            done(null, response || null);
                        } else {
                            done([error], null);
                        }
                    });
                } else {
                    next();
                }
            },

            // last modified
            function (next) {
                stat(filename, function (error, result) {
                    if (!error) {
                        console.log("file stats.file:", result.file);
                        console.log("file stats.modified:", result.modified);
                        if (result.file) {
                            mtime = result.modified;
                            next();
                        } else {
                            client.removeItem(filename, function () {
                                done(null, null);
                            });
                        }
                    } else if (error.code === "ENOENT") {
                        client.removeItem(filename, function () {
                            done(null, null);
                        });
                    } else {
                        client.removeItem(filename, function () {
                            done([error], null);
                        });
                    }
                });
            },

            // check cache
            function (next) {
                deferred([
                    function (remove) {
                        client.getItem(filename, function (error, response) {
                            console.log("client.getItem(%s) =", filename, error, response);
                            if (!error && response && response.date > mtime) {
                                if (response.dependencies.length !== 0) {
                                    next();
                                } else {
                                    done(null, response);
                                }
                            } else if (error) {
                                done([error], null);
                            } else {
                                remove();
                            }
                        });
                    },
                    function () {
                        client.removeItem(filename, function (error) {
                            console.log("client.removeItem(%s) =", filename, error);
                            if (!error) {
                                next();
                            } else {
                                done([error], null);
                            }
                        });
                    }
                ]);
            },

            // modified time
            function (next) {
                var files = [filename];
                function func(filename, date, callback) {
                    readFile(filename, function (error, content) {
                        var references = getFileReferences(filename, content);
                        var memoryReferences;
                        dependencies[filename] = references;

                        memoryFilesystem[filename] = {
                            typescript : content,
                            javascript : null,
                            sourcemap  : null,
                            dependencies : references,
                            date       : null
                        };

                        deferred([
                            function (next) {
                                // todo: при одном клиенте параллельные запросы будут ждать друг друга
                                client.getItems(references, function (error, result) {
                                    // todo: переложить результат в локальный кеш
                                    memoryReferences = result;
                                    next();
                                });
                            },
                            function (next) {
                                var actions = [];
                                references.forEach(function (reference) {
                                    if (files.indexOf(reference) === -1) {
                                        files.push(reference);
                                        actions.push(function (done) {
                                            var modified;
                                            deferred([
                                                function (next) {
                                                    stat(reference, function (error, result) {
                                                        // todo: обрабатывать ошибки
                                                        if (!error && result.file) {
                                                            modified = result.modified;
                                                            date = Math.max(date, modified);
                                                            next();
                                                        } else {
                                                            done();
                                                        }
                                                    });
                                                },
                                                function (next) {
                                                    var cache = memoryReferences[reference];
                                                    if (cache && cache.date > mtime && cache.dependencies.length !== 0) {
                                                        next();
                                                    } else if (cache && cache.date > mtime) {
                                                        // todo: save to memory filesystem
                                                        done();
                                                    } else {
                                                        next();
                                                    }
                                                },
                                                function () {
                                                    func(reference, modified, function () {
                                                        done();
                                                    });
                                                }
                                            ]);
                                        });
                                    }
                                });
                                parallel(actions, function () {
                                    next();
                                });
                            },
                            function () {
                                memoryFilesystem[filename].date = date;
                                callback();
                            }
                        ]);
                    });
                }
                func(filename, mtime, function () {
                    next();
                });
            },

            // lock process
            function (next) {
                client.lock(filename, function (error, result) {
                    console.log("client.lock(%s) = ", filename, error, result);
                    if (!error) {
                        unlock = result;
                        next();
                    } else {
                        done([error], null);
                    }
                });
            },

            /*function (next) {
                lock({
                    temp     : lockTemp,
                    timeout  : lockTimeout,
                    filename : filename
                }, function (error, result) {
                    if (!error) {
                        unlock = result;
                        next();
                    } else {
                        done([error], null);
                    }
                });
            },*/

            // read files
            /*function (next) {
                fs.readFile(resolve + ".ts", function (err, buffer) {
                    var content;
                    if (!err) {
                        content = buffer.toString("utf8");
                        parallel(getFileReferences(filename, content).map(function (filename) {
                            if (files.indexOf(filename) === -1) {
                                files.push(filename);
                                return function (done) {
                                    process({
                                        filename       : filename,
                                        withoutCompile : true
                                    }, function () {
                                        done();
                                    });
                                };
                            }
                            return null;
                        }), function () {
                            memoryFilesystem[filename] = {
                                date       : mtime,
                                typescript : content
                            };
                            next();
                        });
                    } else if (err.code === "ENOENT") {
                        done(null, null);
                        unlock();
                    } else {
                        done([err], null);
                        unlock();
                    }
                });
            },*/

            // compilation process
            function (next) {

                function compileFile(filename, options) {
                    var program = ts.createProgram([filename], options),
                        result  = program.emit(),
                        errors  = [];
                    ts.getPreEmitDiagnostics(program).concat(result.diagnostics).forEach(function (diagnostic) {
                        var temp,
                            code,
                            line,
                            message,
                            filename,
                            character,
                            category;
                        if (diagnostic.file) {
                            message   = ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n');
                            temp      = diagnostic.file.getLineAndCharacterOfPosition(diagnostic.start);
                            filename  = path.relative(basedir, diagnostic.file.fileName);
                            line      = temp.line;
                            character = temp.character;
                            errors.push(new DiagnosticFileError(message, filename, line, character));
                        } else {
                            message  = ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n');
                            code     = diagnostic.code;
                            category = diagnostic.category;
                            errors.push(new DiagnosticError(message, code, category));
                        }
                    });
                    return errors;
                }

                var errors,
                    scriptTarget = ts.ScriptTarget.ES5;
                if (!withoutCompile) {
                    if (scriptsTarget === "es3") {
                        scriptTarget = ts.ScriptTarget.ES3;
                    }
                    errors = compileFile(resolve + ".ts", {
                        noEmitOnError          : true,
                        noImplicitAny          : true,
                        sourceMap              : true,
                        removeComments         : true,
                        sourceRoot             : "/",
                        mapRoot                : "/",
                        emitDecoratorMetadata  : scriptTarget === ts.ScriptTarget.ES5,
                        experimentalDecorators : scriptTarget === ts.ScriptTarget.ES5,
                        target                 : scriptTarget,
                        module                 : ts.ModuleKind.CommonJS
                    });
                    if (errors && errors.length) {
                        delete memoryFilesystem[filename];
                        saveMemoryFileSystem(function (error) {
                            done(errors, null);
                            unlock();
                        });
                    } else {
                        next();
                    }
                } else {
                    next();
                }
            },

            // result
            function () {
                saveMemoryFileSystem(function (error) {
                    if (error) {
                        done([error], null);
                    } else {
                        done(null, memoryFilesystem[filename]);
                    }
                    unlock();
                });
            }

        ]);
    }

    process({
        filename       : filename,
        withoutCompile : false
    }, function () {
        if (typeOf(callback) === "function") {
            callback.apply(this, arguments);
        }
    });

}

module.exports = compile;