/*jslint */
/*global module, require, process, setTimeout */

var fs           = require('fs'),
    util         = require('util'),
    EventEmitter = require('events').EventEmitter,
    path         = require('path'),
    deferred     = require("../deferred"),
    typeOf       = require("../typeOf"),
    less         = require("less");
var memory = require("../memory/WorkerClient");
var client;
var clientQueue;

function Compiler(options) {
    "use strict";

    var self = this,
        paths,
        index,
        length,
        element;

    var memorySocketLocation = String(options.memorySocketLocation || "");
    var useCache = !!options.useCache;

    if (typeOf(options.paths) !== "array") {
        throw new Error("bla bla bla");
    }

    if (options.paths.length === 0) {
        throw new Error("bla bla bla");
    }

    paths = options.paths;
    length = paths.length;

    for (index = 0; index < length; index += 1) {
        element = paths[index];
        if (typeOf(element) !== "string") {
            throw new Error("bla bla bla");
        }
        if (!path.isAbsolute(element)) {
            throw new Error("bla bla bla");
        }
        // todo: check resolved paths
    }

    function getMemory(callback) {
        var temp;
        if (client) {
            setTimeout(function () {
                callback(client);
            }, 0);
        } else {
            if (clientQueue) {
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
            }
        }
    }

    self.compile = function (filename, callback) {

        var resolve,
            content;
        var memory;
        var mtime;

        function done(errors, result) {
            if (typeOf(callback) === "function") {
                callback(errors, result);
            }
        }

        deferred([

            // memory client
            function (next) {
                getMemory(function (error, client) {
                    if (!error) {
                        memory = client;
                        next();
                    } else {
                        callback([error], null);
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
                    actions = paths.map(function (path) {
                        return function (next) {
                            resolve = path.join(path, filename + ".less");
                            fs.stat(resolve, function (error, stats) {
                                if (!error && stats.isFile()) {
                                    done();
                                } else {
                                    if (error) {
                                        errors.push(error);
                                    }
                                    next();
                                }
                            });
                        };
                    });
                actions.push(function () {
                    callback(errors, null);
                });
            },

            function (next) {
                fs.stat(resolve, function (error, stats) {
                    if (!error) {
                        if (stats.isFile()) {
                            mtime = parseInt(Number(stats.mtime).toString().slice(0, -3), 10);
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
                memory.getItem(filename, function (error, result) {
                    var actions;
                    if (!error && result) {
                        if (result.date >= mtime && result.imports.length === 0) {
                            done(null, result);
                        } else if (result.imports.length !== 0) {
                            actions = result.imports.map(function (element) {

                            });
                        } else {
                            next();
                        }
                    } else if (error) {
                        done([error], null);
                    } else {
                        done(null, null);
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
                less.render(content, {

                }, function (error, result) {

                });
            }

        ]);

    };

}

util.inherits(Compiler, EventEmitter);

module.exports = Compiler;