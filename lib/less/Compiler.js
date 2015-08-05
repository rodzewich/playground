/*jslint */
/*global module, require, process, setTimeout */

var fs           = require('fs'),
    util         = require('util'),
    EventEmitter = require('events').EventEmitter,
    path         = require('path'),
    deferred     = require("../deferred"),
    parallel     = require("../parallel"),
    typeOf       = require("../typeOf"),
    less         = require("less");
var memory = require("../memory/WorkerClient");
var client,
    clientQueue;

function Compiler(options) {
    "use strict";

    var self = this,
        index,
        length,
        element;

    var rootDirectory = String(options.rootDirectory || "/");
    var memorySocketLocation = String(options.memorySocketLocation || ""); // todo: check directory
    var sourcesDirectory = options.sourcesDirectory; // todo: check directory
    var importDirectories = options.importDirectories.slice(0); // todo: check directories
    var useCache = !!options.useCache;

    length = importDirectories.length;

    for (index = 0; index < length; index += 1) {
        element = importDirectories[index];
        if (typeOf(element) !== "string") {
            throw new Error("bla bla bla");
        }
        if (!path.isAbsolute(element)) {
            throw new Error("bla bla bla");
        }
        // todo: check resolved importDirectories
    }

    if (importDirectories.indexOf(sourcesDirectory) !== -1) {
        throw new Error("bla bla bla");
    }

    importDirectories.unshift(sourcesDirectory);

    function getMemory(callback) {
        var temp;
        if (client) {
            setTimeout(function () {
                console.log("memory in cache");
                callback(null, client);
            }, 0);
        } else {
            temp = memory({
                socket    : memorySocketLocation,
                namespace : "less"
            });
            temp.connect(function (error) {
                client = !error ? temp : null;
                console.log("memory new");
                callback(error || null, client);
            });
            /*if (clientQueue) {
                clientQueue.once("complete", function (error, client) {
                    callback(error, client);
                });
            } else {
                clientQueue = new EventEmitter();
                temp = memory({
                    socket    : memorySocketLocation,
                    namespace : "less"
                });
                temp.connect(function (error) {
                    client = !error ? temp : null;
                    callback(error || null, client);
                    clientQueue.emit("complete", error || null, client);
                    clientQueue = null;
                });
            }*/
        }
    }

    self.compile = function (filename, callback) {

        var resolve,
            content,
            memory,
            mtime,
            unlock;

        function done(errors, result) {
            if (typeOf(callback) === "function") {
                callback(errors, result);
            }
        }

        deferred([

            // memory client
            function (next) {
                getMemory(function (error, client) {
                    console.log("memory used");
                    if (!error) {
                        memory = client;
                        next();
                    } else {
                        done([error], null);
                    }
                });
            },

            // get keys
            function (next) {
                if (useCache) {
                    memory.getItem(filename, function (error, response) {
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

            function (done) {
                var errors  = [],
                    actions = importDirectories.map(function (directory) {
                        return function (next) {
                            resolve = path.join(directory, filename + ".less");
                            fs.stat(resolve, function (error, stats) {
                                if (!error && stats.isFile()) {
                                    done();
                                } else {
                                    if (error && error.code !== "ENOENT") {
                                        errors.push(error);
                                    }
                                    next();
                                }
                            });
                        };
                    });
                actions.push(function () {
                    if (typeOf(callback) === "function") {
                        callback(errors.length ? errors : null, null);
                    }
                });
                deferred(actions);
            },

            function (next) {
                fs.stat(resolve, function (error, stats) {
                    if (!error) {
                        if (stats.isFile()) {
                            mtime = parseInt(Number(stats.mtime).toString(10).slice(0, -3), 10);
                            next();
                        } else {
                            memory.removeItem(filename, function () {
                                done(null, null);
                            });
                        }
                    } else if (error.code === "ENOENT") {
                        memory.removeItem(filename, function () {
                            done(null, null);
                        });
                    } else {
                        memory.removeItem(filename, function () {
                            done([error], null);
                        });
                    }
                });
            },

            function (next) {
                console.log("next");
                memory.getItem(filename, function (error, result) {
                    if (!error && result && result.date >= mtime && result.imports.length === 0) {
                        done(null, result);
                    } else if (!error && result && result.date >= mtime && result.imports.length !== 0) {
                        parallel(result.imports.map(function (filename) {
                            return function (next) {
                                var actions = importDirectories.map(function (directory) {
                                    var temp = path.join(directory, filename);
                                    return function (next) {
                                        fs.stat(temp, function (error, stats) {
                                            if (!error && stats.isFile()) {
                                                mtime = Math.max(mtime, parseInt(Number(stats.mtime).toString(10).slice(0, -3), 10));
                                            }
                                            next();
                                        });
                                    };
                                });
                                actions.push(function () {
                                    next();
                                });
                                deferred(actions);
                            }
                        }), function () {
                            console.log("parallel complete");
                            if (result.date >= mtime) {
                                done(null, result);
                            } else {
                                next();
                            }
                        });
                    } else if (error) {
                        done([error], null);
                    } else {
                        next();
                    }
                });
            },

            function (next) {
                fs.readFile(resolve, function (error, buffer) {
                    if (!error) {
                        content = buffer.toString("utf8");
                        next();
                    } else {
                        callback([error], null);
                    }
                });
            },

            function (next) {
                memory.lock(filename, function (error, result) {
                    if (!error) {
                        unlock = result;
                        next();
                    } else {
                        done([error], null);
                    }
                });
            },

            function () {
                less.render(content, {
                    paths     : importDirectories,
                    filename  : path.join(sourcesDirectory, filename + ".less"),
                    compress  : true,
                    sourceMap : true,
                    lint      : true
                }, function (error, result) {
                    var value,
                        imports,
                        errors = [];
                    if (!error) {
                        imports = result.imports.map(function (item) {
                            var temp,
                                index,
                                length = importDirectories.length,
                                directory = path.dirname(filename);

                            for (index = 0; index < length; index++) {
                                temp = path.join(directory, path.relative(importDirectories[index], item));
                                if (temp.slice(0, 2) !== "..") {
                                    break;
                                }
                            }

                            if (temp.slice(0, 2) === "..") {
                                errors.push(new Error("bla bla bla"));
                                return null;
                            }

                            return temp;
                        });
                        value = {
                            css     : result.css,
                            map     : (function (map) {
                                map.sources = map.sources.map(function (item) {
                                    var temp,
                                        index,
                                        length = importDirectories.length,
                                        directory = path.dirname(filename);

                                    for (index = 0; index < length; index++) {
                                        temp = path.join(directory, path.relative(importDirectories[index], item));
                                        if (temp.slice(0, 2) !== "..") {
                                            break;
                                        }
                                    }

                                    if (temp.slice(0, 2) === "..") {
                                        return null;
                                    }

                                    return temp;
                                });

                                return JSON.stringify(map);
                            }(JSON.parse(result.map))),
                            less    : content,
                            date    : parseInt(Number(new Date()).toString(10).slice(0, -3), 10),
                            imports : imports
                        };
                        if (errors.length) {
                            done(errors, null);
                            unlock();
                        } else {
                            memory.setItem(filename, value, function (error) {
                                if (!error) {
                                    done(null, value);
                                    unlock();
                                } else {
                                    done([error], null);
                                    unlock();
                                }
                            });
                        }
                    } else {
                        done([error], null);
                        unlock();
                    }
                });
            }

        ]);

    };

}

util.inherits(Compiler, EventEmitter);

module.exports = Compiler;