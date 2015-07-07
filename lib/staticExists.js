"use strict";

var fs          = require("fs"),
    path        = require("path"),
    deferred    = require("./deferred"),
    logger      = require("./logger"),
    cacheExists = require("./cacheExists"),
    locks       = {};

/**
 * @param {object} options
 * @param {string} options.filename
 * @param {string} options.basedir
 * @param {number} [options.timeout=50]
 * @param {boolean} [options.useDebugger=false]
 * @param {boolean} [options.useCache=false]
 * @param {boolean} [options.useOnlyCache=false]
 * @param callback
 */
function staticExists (options, callback) {
    var mtime       = false,
        filename     = String(options.filename || ""),
        basedir      = String(options.basedir || ""),
        useDebugger  = !!options.useDebugger,
        useCache     = !!options.useCache,
        useOnlyCache = !!options.useOnlyCache,
        pathname     = path.join(basedir, filename),
        EventEmitter = require('events').EventEmitter;

    deferred([
        function (next) {
            if (useCache && filename in cacheExists) {
                if (useDebugger) {
                    logger.getLogger("static").debug("Check file exists", {
                        options : options,
                        memory  : true,
                        result  : true
                    });
                }
                callback(cacheExists[filename]);
            } else if (useOnlyCache) {
                if (useDebugger) {
                    logger.getLogger("static").debug("Check file exists", {
                        options : options,
                        memory  : true,
                        result  : false
                    });
                }
                callback(false);
            } else {
                next();
            }
        },
        function (next) {
            if (!locks[filename]) {
                if (useCache) {
                    locks[filename] = new EventEmitter();
                }
                fs.stat(pathname, function (error, stats) {
                    locks[filename].emit("complete", error, stats);
                });
            } else {
                locks[filename].addListener("complete", function (error, stats) {

                });
            }
        },
        function (next) {
            if (!error) {
                if (stats.isFile()) {
                    mtime = stats.mtime;
                } else {
                    mtime = false;
                }
            } else {
                logger.getLogger("static").info("Check file exists", {
                    options : options,
                    memory  : false,
                    error   : error
                });
            }
            delete locks[filename];
            next();
        },
        function () {
            if (useCache) {
                cacheExists[filename] = mtime;
            }
            if (useDebugger) {
                logger.getLogger("static").debug("Check file exists", {
                    options : options,
                    memory  : false,
                    result  : mtime
                });
            }
            callback(mtime);
        }
    ]);
}

module.exports = staticExists;