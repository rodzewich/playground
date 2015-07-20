/*jslint */
/*global module, require */

// todo: in typescript.js replace
// var extendsEmitted      = false; => true;
// var decorateEmitted     = false; => true;
// var paramEmitted        = false; => true;

// todo: 2. сделать работу на воркерах, дочерних процесах
// todo: 3. учесть сдвиг root папки

var fs                  = require("fs");
var path                = require("path");
var sourceMap           = require('source-map');
var lock                = require("./../lock");
var deferred            = require("./../deferred");
var parallel            = require("./../parallel");
var typescript          = require("../../typescript");
var locks               = [];
var typeOf              = require("./../typeOf");
var EventEmitter        = require("events").EventEmitter;
var cacheTypescript     = {};
var DiagnosticError     = require("./diagnosticError");
var DiagnosticFileError = require("./diagnosticFileError");

function compile(options, callback) {
    "use strict";

    var filename      = path.relative("/", options.filename),
        basedir       = options.basedir,
        useCache      = !!options.useCache,
        lockTemp      = "../playground/temp",// options.lockTemp
        lockTimeout   = 100,// options.lockTimeout
        scriptsTarget = "es5",// options.scriptsTarget
        webRoot       = "/",// options.webRoot
        files         = [];

    function process(options, callback) {

        var filename       = options.filename,
            withoutCompile = options.withoutCompile,
            resolve        = path.join(basedir, filename),
            ts             = typescript(),
            mtime;

        files.push(filename);

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

                    if (extension === ".ts" && cacheTypescript[pathname]) {
                        //console.log("sys.readFile(%s) = %s;", JSON.stringify(filename), JSON.stringify(cacheTypescript[pathname].typescript));
                        return cacheTypescript[pathname].typescript;
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
                        if (cacheTypescript[pathname] && !cacheTypescript[pathname].javascript) {
                            references = getFileReferences(pathname, content, true).map(function (element) {
                                return JSON.stringify(String(element));
                            }).join(",");
                            cacheTypescript[pathname].javascript = [
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
                        if (cacheTypescript[pathname] && !cacheTypescript[pathname].sourcemap) {
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
                            cacheTypescript[pathname].sourcemap = result.toString();
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

        deferred([

            function (next) {
                if (!locks[filename]) {
                    locks[filename] = new EventEmitter();
                    next();
                } else {
                    locks[filename].addListener("done", done);
                }
            },

            function (next) {
                if (useCache && cacheTypescript[filename]) {
                    done(null, cacheTypescript[filename]);
                } else if (useCache) {
                    done(null, null);
                } else {
                    next();
                }
            },

            function () {

                /*lock({
                    temp     : lockTemp,
                    timeout  : lockTimeout,
                    filename : filename
                }, function (error, unlock) {
                    if (!error) {
                    } else {
                        done([error], null);
                    }
                });*/

                console.log("filename", filename);

                deferred([

                    // last modified
                    function (next) {
                        fs.stat(resolve + ".ts", function (err, stats) {
                            if (!err) {
                                if (stats.isFile()) {
                                    mtime = new Date(Math.max(Number(stats.mtime), Number(new Date())));
                                    next();
                                } else {
                                    done(null, null);
                                }
                            } else if (err.code === "ENOENT") {
                                done(null, null);
                            } else {
                                done([err], null);
                            }
                        });
                    },

                    // check cache
                    function (next) {
                        if (filename in cacheTypescript && Number(cacheTypescript[filename].date) >= Number(mtime)) {
                            done(null, cacheTypescript[filename]);
                        } else {
                            delete cacheTypescript[filename];
                            next();
                        }
                    },

                    // read files
                    function (next) {
                        fs.readFile(resolve + ".ts", function (err, buffer) {
                            var content;
                            if (!err) {
                                content = buffer.toString("utf8");
                                parallel(getFileReferences(filename, content).map(function (filename) {
                                    if (files.indexOf(filename) === -1) {
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
                                    cacheTypescript[filename] = {
                                        date       : mtime,
                                        typescript : content
                                    };
                                    next();
                                });
                            } else if (err.code === "ENOENT") {
                                done(null, null);
                            } else {
                                done([err], null);
                            }
                        });
                    },

                    // compilation process
                    function (next) {
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
                                delete cacheTypescript[filename];
                                done(errors, null);
                            } else {
                                next();
                            }
                        } else {
                            next();
                        }
                    },

                    // result
                    function () {
                        done(null, cacheTypescript[filename]);
                    }

                ]);

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