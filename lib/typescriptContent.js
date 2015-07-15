/*jslint */
/*global module */

"use strict";

/*

 fs.open
 flag: "wx", "wx+" // блокирующие открытие

 fs.fstat(fd, callback)

 fs.close(fd, callback)

 fs.read(fd, buffer, offset, length, position, callback);

 fs.write(fd, buffer, offset, length[, position], callback)

 fs.write(fd, data[, position[, encoding]], callback)

 fs.unlink(path, callback)


*/

var fs       = require("fs");
var path     = require("path");
var deferred = require("./deferred");
var parallel = require("./parallel");
var clone    = require("./clone");
var typescript       = require("../typescript");
var locks      = [];
var EventEmitter = require("events").EventEmitter;
var cacheTypescript = {};
var DiagnosticError = require("./typescriptDiagnosticError");
var DiagnosticFileError = require("./typescriptDiagnosticFileError");


function typescriptContent(options, callback) {

    var filename = path.relative("/", options.filename),
        basedir  = options.basedir,
        useCache = !!options.useCache,
        files    = [];

    function readFile(filename, withoutCompile, callback) {
        var resolve  = path.join(basedir, filename),
            mtime;

        files.push(filename);

        function complete(error, result) {
            if (locks[filename]) {
                locks[filename].emit("complete");
                delete locks[filename];
            }
            callback(error, result);
        }

        var ts = typescript();

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
                        console.log("sys.readFile(%s) = %s;", JSON.stringify(filename), JSON.stringify(cacheTypescript[pathname].typescript));
                        return cacheTypescript[pathname].typescript;
                    } else if (extension === ".ts" && ["lib.d", "../lib.d", "../../lib.d"].indexOf(pathname) !== -1) {
                        // todo: cache this
                        console.log("sys.readFile(%s) = %s;", JSON.stringify(filename), JSON.stringify(fs.readFileSync("../lib.d.ts").toString("utf8")));
                        return fs.readFileSync("../lib.d.ts").toString("utf8");
                    }

                    console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!1", pathname, ["lib.d", "../lib.d", "../../lib.d"].indexOf(pathname) !== -1);

                    console.log("sys.readFile(%s) = %s;", JSON.stringify(filename), undefined);

                    return undefined;

                },

                writeFile : function () {
                    var ret = sys.writeFile.apply(this, arguments);
                    console.log("sys.writeFile: arguments =", arguments, " return =", ret);
                    return ret;
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

                directoryExists : function () {
                    var ret = sys.directoryExists.apply(this, arguments);
                    console.log("sys.directoryExists: arguments =", arguments, " return =", ret);
                    return ret;
                },

                createDirectory : function () {
                    var ret = sys.createDirectory.apply(this, arguments);
                    console.log("sys.createDirectory: arguments =", arguments, " return =", ret);
                    return ret;
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
                    var ret = sys.getMemoryUsage.apply(this, arguments);
                    console.log("sys.getMemoryUsage: arguments =", arguments, "return =", ret);
                    return ret;
                },

                exit : function () {
                    var ret = sys.exit.apply(this, arguments);
                    console.log("sys.exit: arguments =", arguments, "return =", ret);
                    return ret;
                }

            }

        }(ts.sys));

        function getReferences(filename, content) {
            var result = [];
            return ts.preProcessFile(content, false).referencedFiles.forEach(function (item) {
                var dirname = path.dirname(filename),
                    result  = path.resolve(dirname, item.fileName),
                    extension;
                if (dirname === ".") {
                    result  = path.resolve("/", item.fileName).substr(1);
                }
                extension = resolve.substr(-3);
                if () {

                }
                console.log("references, filename: %s", JSON.stringify(filename));
                console.log("references, dirname: %s", JSON.stringify(dirname));
                console.log("references, item: %s", JSON.stringify(item.fileName));
                console.log("references, result: %s", JSON.stringify(result));
                return result;
            });
            return result;
        }

        function compile(filename, options) {
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
                    filename  = diagnostic.file.fileName;
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
                            console.log("read deps:", filename);
                            var extension = filename.substr(-3).toLowerCase();
                            if (extension === ".ts") {
                                filename = /*path.relative(*/basedir, filename.substr(0, filename.length - 3)/*)*/;
                                if (files.indexOf(filename) === -1) {
                                    files.push(filename);
                                    return function (complete) {
                                        console.log("read deps:", filename);
                                        readFile(filename, true, function () {
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

            function (next) {
                if (!withoutCompile) {
                    var errors = compile(resolve + ".ts", {
                        noEmitOnError : true,
                        noImplicitAny : true,
                        sourceMap     : true,
                        target        : ts.ScriptTarget.ES3,
                        module        : ts.ModuleKind.AMD
                    });
                    console.log("errors =", errors);
                    console.log("cache =", cacheTypescript);
                }
                next();
            },

            function () {
                complete(null, cacheTypescript[filename]);
            }

        ]);
    }

    readFile(filename, false, function () {
        if (typeof callback === "function") {
            callback.apply(this, arguments);
        }
    });

}

module.exports = typescriptContent;