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
        pathname     = path.join(basedir, filename);
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
                    locks[filename] = true;
                }
                fs.stat(pathname, function (error, stats) {
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
                });
            } else {
                setTimeout(function () {
                    staticExists(options, callback);
                }, 50);
            }
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