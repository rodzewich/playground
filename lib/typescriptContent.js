/*jslint */
/*global module */

"use strict";

var fs       = require("fs");
var path     = require("path");
var deferred = require("./deferred");
var parallel = require("./parallel");
var ts       = require("../typescript");
var locks      = [];
var EventEmitter = require("events").EventEmitter;
var cacheTypescript = {};

ts.sys = (function (sys) {

    return {
        args: sys.args,
        newLine: sys.newLine,
        useCaseSensitiveFileNames: sys.useCaseSensitiveFileNames,
        write: function () {
            var ret = sys.write.apply(this, arguments);
            console.log("sys.write: arguments =", arguments, " return =", ret);
            return ret;
        },
        readFile: function () {
            var ret = sys.readFile.apply(this, arguments);
            console.log("sys.readFile: arguments =", arguments, "return = [Binary]");
            return ret;
        },
        writeFile: function () {
            console.log("sys.writeFile: arguments =", arguments);
            return sys.writeFile.apply(this, arguments);
        },
        watchFile: function () { // todo: ???
            console.log("sys.watchFile: arguments =", arguments);
            return sys.watchFile.apply(this, arguments);
        },
        resolvePath: function () {
            console.log("sys.resolvePath: arguments =", arguments);
            return sys.resolvePath.apply(this, arguments);
        },
        fileExists: function () {
            console.log("sys.fileExists: arguments =", arguments);
            return sys.fileExists.apply(this, arguments);
        },
        directoryExists: function () {
            console.log("sys.directoryExists: arguments =", arguments);
            return sys.directoryExists.apply(this, arguments);
        },
        createDirectory: function () {
            console.log("sys.createDirectory: arguments =", arguments);
            return sys.createDirectory.apply(this, arguments);
        },
        getExecutingFilePath: function () {
            console.log("sys.getExecutingFilePath: arguments =", arguments);
            return sys.getExecutingFilePath.apply(this, arguments);
        },
        getCurrentDirectory: function () {
            var ret = sys.getCurrentDirectory.apply(this, arguments);
            console.log("sys.getCurrentDirectory: arguments =", arguments, "return =", ret);
            return ret;
        },
        readDirectory: function () {
            var ret = sys.readDirectory.apply(this, arguments);
            console.log("sys.readDirectory: arguments =", arguments, "return =", ret);
            return ret;
        },
        getMemoryUsage: function () {
            var ret = sys.getMemoryUsage.apply(this, arguments);
            console.log("sys.getMemoryUsage: arguments =", arguments, "return =", ret);
            return ret;
        },
        exit: function () {
            var ret = sys.exit.apply(this, arguments);
            console.log("sys.exit: arguments =", arguments, "return =", ret);
            return ret;
        }
    }

}(ts.sys));

function typescriptContent(options, callback) {

    var filename   = options.filename,
        basedir    = options.basedir,
        useCache   = !!options.useCache;

    var current;
    var files = [];

    function getReferences(filename, content) {
        return ts.preProcessFile(content, false).referencedFiles.map(function (item) {
            return path.resolve(path.dirname(filename), String(item.fileName));
        });
    }

    function compile(filename, options) {
        var program = ts.createProgram([filename], options),
            result  = program.emit(),
            errors  = [];

        ts.getPreEmitDiagnostics(program).concat(result.diagnostics).forEach(function (diagnostic) {
            if (diagnostic.file) {
                var temp      = diagnostic.file.getLineAndCharacterOfPosition(diagnostic.start),
                    line      = temp.line,
                    character = temp.character,
                    message   = ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n');
                errors.push(new Error(message));
                console.log(["(", diagnostic.file.fileName, ", ", line + 1, ":", character + 1, "): ", message].join(""));
            } else {
                errors.push(new Error(diagnostic.messageText));
                console.log([diagnostic.messageText, "(code:", diagnostic.code, " category:", diagnostic.category, ")"].join(""));
            }
        });

        return errors;
    }

    function readFile(filename, callback) {
        var resolve = path.join(basedir, filename),
            mtime;

        files.push(filename);

        function complete(error, result) {
            if (locks[filename]) {
                locks[filename].emit("complete");
                delete locks[filename];
            }
            callback(error, result);
        }


        deferred([

            function (next) {
                if (!locks[filename]) {
                    locks[filename] = new EventEmitter();
                    next();
                } else {
                    locks[filename].addListener("complete", function () {
                        next(); // todo: ???
                    });
                }
            },

            function (next) {
                if (useCache && filename in cacheTypescript) {
                    complete(null, cacheTypescript[filename]);
                } else if (useCache) {
                    complete(null, null);
                } else {
                    next();
                }
            },

            function (next) {
                fs.stat(resolve + ".ts", function (err, stats) {
                    if (!err) {
                        if (stats.isFile()) {
                            mtime = stats.mtime;
                            next();
                        } else {
                            complete(null, null);
                        }
                    } else if (err.code === "ENOENT") {
                        complete(null, null);
                    } else {
                        complete(err, null);
                    }
                });
            },

            function (next) {
                if (filename in cacheTypescript && Number(cacheTypescript[filename].date) >= Number(mtime)) {
                    complete(null, cacheTypescript[filename]);
                } else {
                    delete cacheTypescript[filename];
                    next();
                }
            },

            function (next) {
                fs.readFile(resolve + ".ts", function (err, buffer) {
                    var content;
                    if (!err) {
                        content = buffer.toString("utf8");
                        parallel(getReferences(filename, content).map(function (filename) {
                            var extension = filename.substr(-3).toLowerCase();
                            if (extension === ".ts") {
                                filename = filename.substr(0, filename.length - 3);
                                if (files.indexOf(filename) === -1) {
                                    files.push(filename);
                                    return function (complete) {
                                        readFile(filename, function () {
                                            complete();
                                        });
                                    };
                                }
                            }
                            return null;
                        }), function () {
                            if (!cacheTypescript[filename]) {
                                cacheTypescript[filename] = {};
                            }
                            cacheTypescript[filename].date = mtime;
                            cacheTypescript[filename].typescript = content;
                            next();
                        });
                    } else if (err.code === "ENOENT") {
                        complete(null, null);
                    } else {
                        complete(err, null);
                    }
                });
            },

            /*function (next) {
                compile(path.join(basedir, filename) + ".ts", {
                    noEmitOnError : true,
                    noImplicitAny : true,
                    sourceMap     : true,
                    target        : ts.ScriptTarget.ES3,
                    module        : ts.ModuleKind.AMD
                });
                next();
            },*/

            function () {
                complete(null, cacheTypescript[filename]);
            }

        ]);
    }

    readFile(filename, function () {
        if (typeof callback === "function") {
            callback.apply(this, arguments);
        }
    });

}

module.exports = typescriptContent;