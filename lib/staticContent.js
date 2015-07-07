/*jslint */
/*global module */

"use strict";

var fs           = require("fs"),
    path         = require("path"),
    types        = require("./types"),
    deferred     = require("./deferred"),
    staticExists = require("./staticExists"),
    cacheExists  = require("./cacheExists"),
    cacheContent = require("./cacheContent"),
    EventEmitter = require("events").EventEmitter,
    locks        = {};

/**
 * @param {object} options
 * @param {string} options.filename
 * @param {string} options.basedir
 * @param {string} [options.charset="utf-8"]
 * @param {boolean} [options.useDebugger=false]
 * @param {boolean} [options.useCache=false]
 * @param {function} callback
 */
function staticContent (options, callback) {

    var type         = types.other,
        charset      = options.charset || "utf-8",
        filename     = options.filename,
        basedir      = options.basedir,
        useDebugger  = !!options.useDebugger,
        useMemory    = !!options.useMemory,
        useCache     = !!options.useCache,
        pathname     = path.join(basedir, filename),
        error,
        mtime,
        content;

    deferred([

        function (next) {
            staticExists({
                basedir     : basedir,
                filename    : filename,
                useDebugger : useDebugger,
                useCache    : useCache
            }, function (err, result) {
                if (!err) {
                    if (!result) {
                        callback(null, null);
                    } else {
                        mtime = result;
                        next();
                    }
                } else {
                    callback(err, null);
                }
            });
        },

        function (next) {
            if (!useMemory) {
                next();
            } else if (filename in cacheContent && Number(cacheContent[filename].date) >= Number(mtime)) {
                callback(null, cacheContent[filename]);
            } else if (useCache) {
                cacheExists[filename] = false;
                callback(null, null);
            } else {
                delete cacheContent[filename];
                next();
            }
        },

        function (next) {
            var extension = path.extname(filename).substr(1).toLowerCase(),
                property;
            if (types.text[extension]) {
                type = types.text[extension] + "; charset=" + charset;
            } else {
                for (property in types) {
                    if (!types.hasOwnProperty(property) || property === "text" || typeof types[property] === "string") {
                        continue;
                    }
                    if (types[property][extension]) {
                        type = types[property][extension];
                        break;
                    }
                }
            }
            next();
        },

        function (next) {
            function handler(error, buffer) {
                if (!error) {
                    content = buffer;
                    if (useMemory) {
                        cacheExists[filename] = mtime;
                        cacheContent[filename] = {
                            type    : type,
                            content : content,
                            date    : mtime
                        };
                    }
                    callback(null, {
                        type    : type,
                        content : content,
                        date    : mtime
                    });
                } else if (error.code === "ENOENT") {
                    callback(null, null);
                } else {
                    if (useMemory) {
                        cacheExists[filename] = false;
                        delete cacheContent[filename];
                    }
                    callback(error, null);
                }
            }
            if (!useMemory) {
                fs.readFile(pathname, function (error, buffer) {
                    handler(error, buffer);
                });
            } else if (!locks[filename]) {
                locks[filename] = new EventEmitter();
                fs.readFile(pathname, function (error, buffer) {
                    handler(error, buffer);
                    locks[filename].emit("complete", error, buffer);
                    delete locks[filename];
                });
            } else {
                locks[filename].addListener("complete", function (error, buffer) {
                    handler(error, buffer);
                });
            }
        }

    ]);
}

module.exports = staticContent;