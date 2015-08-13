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
var Logger = require("../Logger");
var logger = Logger.getLogger("typescript");

var memory = require("../memory/WorkerClient");

function compile(options, callback) {
    "use strict";

    Logger.getLogger("typescript").debug("Call compile", options);

    var errorBackgroundColor = String(options.errorBackgroundColor || "yellow"); // todo: check color
    var errorTextColor = String(options.errorTextColor || "black"); // todo: check color
    var errorBlockPadding = String(options.errorBlockPadding || "10px"); // todo: check size
    var errorFontSize = String(options.errorFontSize || "13px"); // todo: check size

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

    function getFileReferences(filename, content, withoutDefinitions) {
        var fileReferences = [];
        ts.preProcessFile(content, false).referencedFiles.forEach(function (item) {
            var directory  = path.dirname(filename),
                result     = path.join(directory, item.fileName),
                additional = result.substr(-5).toLowerCase(),
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
                            "define(" + JSON.stringify(pathname) + ", [" + references + "], function (module, require, __extends, __decorate, __metadata, __param) {",
                            "    var exports = module.exports;",
                            content.split("\n").map(function (line, index, array) {
                                return index !== array.length - 1 ? "    " + line : "";
                            }).join("\n"),
                            "});"
                        ].join("\n");
                    }
                } else if (filename.substr(-7).toLowerCase() === ".js.map") {
                    pathname = path.relative(basedir, filename.substr(0, filename.length - 7));
                    if (memoryFilesystem[pathname] && !memoryFilesystem[pathname].sourcemap) {
                        sourcemap = JSON.parse(content);
                        source    = new sourceMap.SourceMapConsumer(sourcemap);
                        result    = new sourceMap.SourceMapGenerator();
                        source.eachMapping(function (item) {
                            result.addMapping({
                                generated : {
                                    line   : item.generatedLine + 2, // todo: hardcode
                                    column : item.generatedColumn + 4 // todo: hardcode
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
                logger.debug("3. client.connect", {
                    error : error || null
                });
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
                    logger.debug("4. client.getItem(" + String(filename) + ")", {
                        error  : error || null,
                        result : !!response
                    });
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
                        logger.debug("5. stat(" + String(filename) + ")", {
                            mtime : mtime
                        });
                        next();
                    } else {
                        client.removeItem(filename, function (error) {
                            logger.debug("6. client.removeItem(" + String(filename) + ")", {
                                error : error || null
                            });
                            if (!error) {
                                done(null);
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
                } else if (error.code === "ENOENT") {
                    client.removeItem(filename, function (error) {
                        logger.debug("7. client.removeItem(" + String(filename) + ")", {
                            error : error || null
                        });
                        if (!error) {
                            done(null);
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
                    client.removeItem(filename, function (err) {
                        logger.debug("8. client.removeItem(" + String(filename) + ")", {
                            errors: err ? [error, err] : [error]
                        });
                        if (!err) {
                            done(null);
                        } else {
                            done({
                                typescript   : "",
                                javascript   : errorHandler([error, err]),
                                sourcemap    : "{}",
                                dependencies : [],
                                date         : parseInt(Number(new Date()).toString(10).slice(0, -3), 10)
                            });
                        }
                    });
                }
            });
        },

        // check cache
        function (next) {
            deferred([
                function (remove) {
                    client.getItem(filename, function (error, response) {
                        logger.debug("11. client.getItem(" + filename + ")", {
                            error    : error || null,
                            response : !!response
                        });
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
            logger.debug("12. Calculate modified time");
            function func(filename, date, callback) {
                readFile(filename, function (error, content) {
                    var references = getFileReferences(filename, content);
                    var memoryReferences;

                    dependencies[filename] = references;

                    memoryFilesystem[filename] = {
                        typescript   : content,
                        javascript   : null,
                        sourcemap    : null,
                        dependencies : references,
                        date         : null
                    };

                    deferred([
                        function (next) {
                            if (references.length) {
                                client.getItems(references, function (error, result) {
                                    logger.debug("9. client.getItems([" + references.join(",") + "])", {
                                        error  : error || null,
                                        result : !!result
                                    });
                                    // todo: переложить результат в локальный кеш
                                    memoryReferences = result;
                                    next();
                                });
                            } else {
                                memoryReferences = [];
                                next();
                            }
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
                                                    if (!memoryFilesystem[reference]) {
                                                        client.getItem(reference, function (error, response) {
                                                            if (!error && response) {
                                                                memoryFilesystem[filename] = response;
                                                                done();
                                                            } else if (!error && !response) {
                                                                next();
                                                            } else {
                                                                // todo: обрабатывать ошибки
                                                                done();
                                                            }
                                                        });
                                                        //next();
                                                    } else {
                                                        done();
                                                    }
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
                logger.debug("10. client.lock(" + filename + ")", {
                    error  : error || null,
                    result : !!result
                });
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

var references = require("./references");

function Compiler(options) {
    "use strict";

    var self = this;

    var errorBackgroundColor = String(options.errorBackgroundColor || "yellow"), // todo: check color
        errorTextColor       = String(options.errorTextColor || "black"), // todo: check color
        errorBlockPadding    = String(options.errorBlockPadding || "10px"), // todo: check size
        errorFontSize        = String(options.errorFontSize || "13px"), // todo: check size
        filename             = options.filename,
        sourcesDirectory     = options.sourcesDirectory,
        useCache             = !!options.useCache,
        memorySocketLocation = String(options.memorySocketLocation),// todo: check to exists
        scriptsTarget        = options.scriptsTarget,
        ts                   = typescript(),
        files                = {}, // (fs.readFile) используется для кеширования чтения файлов
        filesLocks           = {}, // (fs.readFile) блокировки для кеширования чтения файлов
        stats                = {}, // (fs.stat) используется для кеширования чтения характеристик файлов
        statsLocks           = {}; // (fs.stat) блокировки для кеширования чтения характеристик файлов

    var filesystem = {};

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

    function readFile(filename, callback) {
        var result  = files[filename],
            resolve = path.join(sourcesDirectory, filename) + ".ts",
            lock    = filesLocks[filename];
        if (result) {
            setTimeout(function () {
                callback(result.error, result.result);
            }, 0);
        } else if (lock) {
            lock.on("complete", function (error, result) {
                callback(error, result);
            });
        } else {
            filesLocks[filename] = new EventEmitter();
            fs.readFile(resolve, function (error, result) {
                var lock = filesLocks[filename];
                files[filename] = {error: error || null, result: result || null};
                lock.emit("complete", error || null, result || null);
                callback(error || null, result || null);
                delete filesLocks[filename];
            });
        }
    }

    function stat(filename, callback) {
        var result = stats[filename],
            resolve = path.join(sourcesDirectory, filename) + ".ts",
            lock = statsLocks[filename];
        if (result) {
            setTimeout(function () {
                callback(result.error, result.result);
            }, 0);
        } else if (lock) {
            lock.on("complete", function (error, stats) {
                callback(error, stats);
            });
        } else {
            statsLocks[filename] = new EventEmitter();
            fs.stat(resolve, function (error, result) {
                var lock = statsLocks[filename];
                stats[filename] = {error: error || null, result: result || null};
                lock.emit("complete", error || null, result || null);
                callback(error || null, result || null);
                delete statsLocks[filename];
            });
        }
    }

    EventEmitter.call(this);

    self.compile = function (filename, callback) {

    };

}

util.inherits(Compiler, EventEmitter);

module.exports = Compiler;