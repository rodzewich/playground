/*jslint */
/*global module, require */

// todo: in typescript.js replace
// var extendsEmitted      = false; => true;
// var decorateEmitted     = false; => true;
// var paramEmitted        = false; => true;

// todo: 2. сделать работу на воркерах, дочерних процесах
// todo: нет контента *.ts файла в случае кривой компиляции

var fs                  = require("fs");
var path                = require("path");
var sourceMap           = require('source-map');
var colors           = require('colors');
var lock                = require("./../lock");
var deferred            = require("./../deferred");
var parallel            = require("./../parallel");
var typescript          = require("../../typescript");
//var locks               = {};
var typeOf              = require("./../typeOf");
var EventEmitter        = require("events").EventEmitter;
//var cacheTypescript     = {};
var DiagnosticError     = require("./DiagnosticError");
var DiagnosticFileError = require("./DiagnosticFileError");
var timeStart           = Number(new Date());

var memory = require("../memory/WorkerClient");

function compile(options, callback) {
    "use strict";

    var errorBackgroundColor = String(options.errorBackgroundColor || "yellow"); // todo: check color
    var errorTextColor = String(options.errorTextColor || "black"); // todo: check color
    var errorBlockPadding = String(options.errorBlockPadding || "10px"); // todo: check size
    var errorFontSize = String(options.errorFontSize || "13px"); // todo: check size

    function errorHandler(errors) {
        var property,
            content    = [],
            bodyBefore = {
                "margin"           : "0 !important",
                "overflow"         : "hidden !important",
                "display"          : "block !important",
                "padding"          : errorBlockPadding + " !important",
                "color"            : errorTextColor + " !important",
                "background-color" : errorBackgroundColor + " !important",
                "white-space"      : "pre !important",
                "font-family"      : "'Courier New',Courier,'Lucida Sans Typewriter','Lucida Typewriter',monospace !important",
                "font-size"        : errorFontSize + " !important",
                "font-style"       : "normal !important",
                "font-variant"     : "normal !important",
                "font-weight"      : "400 !important",
                "word-wrap"        : "break-word !important",
                "content"          : JSON.stringify(errors.map(function (error, index) {
                    return String(index + 1) + ". " + error.stack;
                }).join("\n\n")).replace(/\\n/g, "\\A ") + " !important"
            };
        for (property in bodyBefore) {
            if (!bodyBefore.hasOwnProperty(property)) {
                continue;
            }
            content.push(property + ":" + bodyBefore[property] + ";");
        }
        return "(function(){var d=document,s=d.createElement(\"style\"),t=d.createTextNode(" + JSON.stringify("body:before{" + content.join("") + "}") + ");s.appendChild(t);(d.head||d.body).appendChild(s);}());";
    }

    console.log("-------------------------------");
    console.log(" # ", process.pid);
    console.log("options", options);

    var filename      = options.filename,
        basedir       = options.sourcesDirectory,
        useCache      = !!options.useCache,
        memorySocketLocation = String(options.memorySocketLocation),// todo: check to exists
        //lockTemp      = path.join(options.lockTemp, "typescript/locks"),
        //lockTimeout   = options.lockTimeout,
        scriptsTarget = options.scriptsTarget,
        client,
        unlock,
        memoryFilesystem = {},
        resolve        = path.join(basedir, filename),
        ts             = typescript(),
        dependencies   = {},
        mtime,
        fileSystem = {},
        statCache = {};

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

    function saveMemoryFileSystem(callback) {
        var result = {},
            file,
            item;
        for (file in memoryFilesystem) {
            if (!memoryFilesystem.hasOwnProperty(file)) {
                continue;
            }
            item = memoryFilesystem[file];
            if (typeOf(item.date)         === "number" &&
                typeOf(item.typescript)   === "string" &&
                typeOf(item.sourcemap)    === "string" &&
                typeOf(item.javascript)   === "string" &&
                typeOf(item.dependencies) === "array") {
                result[file] = {
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

    function done(result) {
        if (typeOf(callback) === "function") {
            callback(result);
        }
    }

    ts.sys = (function (sys) {

        return {

            args : [],

            newLine : sys.newLine,

            useCaseSensitiveFileNames : sys.useCaseSensitiveFileNames,

            write : function () {
                var ret = sys.write.apply(this, arguments);
                return ret;
            },

            readFile : function (filename) {

                var extension = filename.substr(-3).toLowerCase(),
                    pathname  = path.relative(basedir, filename.substr(0, filename.length - 3));

                if (extension === ".ts" && memoryFilesystem[pathname]) {
                    return memoryFilesystem[pathname].typescript;
                }
                if (extension === ".ts" && ["lib.d", "../lib.d", "../../lib.d"].indexOf(pathname) !== -1) {
                    // todo: cache this
                    return fs.readFileSync(path.join(__dirname, "../../lib.d.ts")).toString("utf8");
                }

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
            },

            watchFile : function () { // todo: ???
                return sys.watchFile.apply(this, arguments);
                return ret;
            },

            resolvePath : function () {
                var ret = sys.resolvePath.apply(this, arguments);
                return ret;
            },

            fileExists : function () {
                var ret = sys.fileExists.apply(this, arguments);
                return ret;
            },

            directoryExists : function (directoryName) {
                return true;
            },

            createDirectory : function (directoryName) {
            },

            getExecutingFilePath : function () {
                return basedir;
            },

            getCurrentDirectory : function () {
                return basedir;
            },

            readDirectory : function () {
                return sys.readDirectory.apply(this, arguments);
            },

            getMemoryUsage : function () {
                return sys.getMemoryUsage.apply(this, arguments);
            },

            exit : function () {
            }

        };

    }(ts.sys));

    deferred([

        // connect to memory
        function (next) {
            client = memory({
                socket    : memorySocketLocation,
                namespace : "typescript"
            });
            // todo: skip connect
            client.connect(function (error) {
                if (!error) {
                    next();
                } else {
                    done({
                        typescript   : "",
                        javascript   : errorHandler([error]),
                        sourcemap    : "{}",
                        dependencies : [],
                        date         : parseInt(Number(new Date()).toString(10).slice(0, -3), 10)
                    });
                }
            });
        },

        // check cache
        function (next) {
            if (useCache) {
                client.getItem(filename, function (error, response) {
                    if (!error) {
                        done(response || null);
                    } else {
                        done({
                            typescript   : "",
                            javascript   : errorHandler([error]),
                            sourcemap    : "{}",
                            dependencies : [],
                            date         : parseInt(Number(new Date()).toString(10).slice(0, -3), 10)
                        });
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
                    if (result.file) {
                        mtime = result.modified;
                        next();
                    } else {
                        client.removeItem(filename, function () {
                            done(null);
                        });
                    }
                } else if (error.code === "ENOENT") {
                    client.removeItem(filename, function () {
                        done(null);
                    });
                } else {
                    client.removeItem(filename, function () {
                        done({
                            typescript   : "",
                            javascript   : errorHandler([error]),
                            sourcemap    : "{}",
                            dependencies : [],
                            date         : parseInt(Number(new Date()).toString(10).slice(0, -3), 10)
                        });
                    });
                }
            });
        },

        // check cache
        function (next) {
            deferred([
                function (remove) {
                    client.getItem(filename, function (error, response) {
                        if (!error && response && response.date >= mtime) {
                            if (response.dependencies.length !== 0) {
                                next();
                            } else {
                                done(response);
                            }
                        } else if (error) {
                            done({
                                typescript   : "",
                                javascript   : errorHandler([error]),
                                sourcemap    : "{}",
                                dependencies : [],
                                date         : parseInt(Number(new Date()).toString(10).slice(0, -3), 10)
                            });
                        } else {
                            remove();
                        }
                    });
                },
                function () {
                    client.removeItem(filename, function (error) {
                        if (!error) {
                            next();
                        } else {
                            done({
                                typescript   : "",
                                javascript   : errorHandler([error]),
                                sourcemap    : "{}",
                                dependencies : [],
                                date         : parseInt(Number(new Date()).toString(10).slice(0, -3), 10)
                            });
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
                                                if (cache && cache.date >= mtime && cache.dependencies.length !== 0) {
                                                    next();
                                                } else if (cache && cache.date >= mtime) {
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
                if (!error) {
                    unlock = result;
                    next();
                } else {
                    done({
                        typescript   : "",
                        javascript   : errorHandler([error]),
                        sourcemap    : "{}",
                        dependencies : [],
                        date         : parseInt(Number(new Date()).toString(10).slice(0, -3), 10)
                    });
                }
            });
        },

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
                    done({
                        typescript   : "",
                        javascript   : errorHandler(errors),
                        sourcemap    : "{}",
                        dependencies : [],
                        date         : parseInt(Number(new Date()).toString(10).slice(0, -3), 10)
                    });
                    unlock();
                });
            } else {
                next();
            }
        },

        // result
        function () {
            saveMemoryFileSystem(function (error) {
                if (error) {
                    done({
                        typescript   : "",
                        javascript   : errorHandler([error]),
                        sourcemap    : "{}",
                        dependencies : [],
                        date         : parseInt(Number(new Date()).toString(10).slice(0, -3), 10)
                    });
                } else {
                    done(memoryFilesystem[filename]);
                }
                unlock();
            });
        }

    ]);
}

module.exports = compile;