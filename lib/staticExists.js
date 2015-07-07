"use strict";

var fs           = require("fs"),
    path         = require("path"),
    deferred     = require("./deferred"),
    logger       = require("./logger"),
    cacheExists  = require("./cacheExists"),
    EventEmitter = require("events").EventEmitter,
    locks        = {};

/**
 * @param {object} options
 * @param {string} options.filename
 * @param {string} options.basedir
 * @param {boolean} [options.useDebugger=false]
 * @param {boolean} [options.useCache=false]
 * @param callback
 */
function staticExists (options, callback) {

    var mtime        = false,
        filename     = String(options.filename || ""),
        basedir      = String(options.basedir || ""),
        useDebugger  = !!options.useDebugger,
        useCache     = !!options.useCache,
        pathname     = path.join(basedir, filename),
        error;

    deferred([

        function (next) {
            if (filename in cacheExists) {
                if (useDebugger) {
                    logger.getLogger("static").debug("Check file exists", {
                        options : options,
                        memory  : true,
                        result  : cacheExists[filename]
                    });
                }
                callback(null, cacheExists[filename]);
            } else if (useCache) {
                if (useDebugger) {
                    logger.getLogger("static").debug("Check file exists", {
                        options : options,
                        memory  : true,
                        result  : false
                    });
                }
                callback(null, false);
            } else {
                next();
            }
        },

        function (next) {
            function handler(err, stats) {
                if (!err) {
                    if (stats.isFile()) {
                        mtime = stats.mtime;
                    } else {
                        mtime = false;
                    }
                } else if (err.code === "ENOENT") {
                    mtime = false;
                } else {
                    error = err;
                    logger.getLogger("static").info("Check file exists", {
                        options : options,
                        memory  : false,
                        error   : error
                    });
                }
            }
            if (!locks[filename]) {
                locks[filename] = new EventEmitter();
                fs.stat(pathname, function (error, stats) {
                    handler(error, stats);
                    locks[filename].emit("complete", error, stats);
                    delete locks[filename];
                    next();
                });
            } else {
                locks[filename].addListener("complete", function (error, stats) {
                    handler(error, stats);
                    next();
                });
            }
        },

        function () {
            cacheExists[filename] = mtime;
            if (useDebugger) {
                logger.getLogger("static").debug("Check file exists", {
                    options : options,
                    memory  : false,
                    result  : mtime
                });
            }
            callback(error || null, mtime);
        }

    ]);
}

module.exports = staticExists;