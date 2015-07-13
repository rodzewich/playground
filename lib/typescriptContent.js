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

    function readFile(filename, callback) {
        var resolve = path.join(basedir, filename),
            mtime;
        files.push(filename);
        deferred([
            function (next) {
                if (!locks[filename]) {
                    locks[filename] = new EventEmitter();
                    next();
                } else {
                    locks[filename].addListener("complete", function () {
                        next();
                    });
                }
            },
            function (next) {
                if (useCache && filename in cacheTypescript) {
                    callback(null, cacheTypescript[filename]);
                } else if (useCache) {
                    callback(null, null);
                } else {
                    next();
                }
            },
            function (next) {
                fs.stat(resolve, function (err, stats) {
                    if (!err) {
                        if (stats.isFile()) {
                            mtime = stats.mtime;
                            next();
                        } else {
                            callback(null, null);
                        }
                    } else if (err.code === "ENOENT") {
                        callback(null, null);
                    } else {
                        callback(err, null);
                    }
                });
            },
            function (next) {
                if (filename in cacheTypescript && Number(cacheTypescript[filename].date) >= Number(mtime)) {
                    callback(null, cacheTypescript[filename]);
                } else {
                    delete cacheTypescript[filename];
                    next();
                }
            },
            function (next) {
                fs.readFile(filename, function (err, buffer) {
                    var content;
                    if (!err) {
                        content = buffer.toString("utf8");
                        parallel(getReferences(filename, content).map(function (filename) {
                            if (files.indexOf(filename) === -1) {
                                return function (complete) {
                                    readFile(filename, function () {
                                        complete();
                                    });
                                };
                            }
                            return null;
                        }), function () {
                            cacheTypescript[filename].date = mtime;
                            cacheTypescript[filename].typescript = content;
                            next();
                        });
                    } else if (err.code === "ENOENT") {
                        callback(null, null);
                    } else {
                        callback(err, null);
                    }
                });
            },
            function () {
                locks[filename].emit("complete");
                delete locks[filename];
                callback(null, cacheTypescript[filename]);
            }
        ]);
    }

    readFile(filename + ".js", function () {
        if (typeof callback === "function") {
            callback.apply(this, arguments);
        }
    })

}

module.exports = typescriptContent;