"use strict";

var fs       = require("fs"),
    path     = require("path"),
    deferred = require("./deferred"),
    logger   = require("./logger"),
    cache    = require("./cacheExists");

/**
 * @param {object} options
 * @param {string} options.filename
 * @param {string} options.basedir
 * @param {boolean} [options.useDebugger=false]
 * @param {boolean} [options.useCache=false]
 * @param {boolean} [options.useOnlyCache=false]
 * @param callback
 */
function staticExists (options, callback) {
    var exists       = false,
        filename     = String(options.filename || ""),
        basedir      = String(options.basedir || ""),
        useDebugger  = !!options.useDebugger,
        useCache     = !!options.useCache,
        useOnlyCache = !!options.useOnlyCache,
        locks        = {}, // todo: use locks
        pathname     = path.join(basedir, filename);
    deferred([
        function (next) {
            if (useCache && filename in cache) {
                if (useDebugger) {
                    logger.getLogger("static").debug("Check file exists:", {
                        options : options,
                        memory  : true,
                        result  : true
                    });
                }
                callback(cache[filename]);
            } else {
                if (useOnlyCache) {
                    if (useDebugger) {
                        logger.getLogger("static").debug("Check file exists:", {
                            options : options,
                            memory  : true,
                            result  : false
                        });
                    }
                    callback(cache[filename]);
                } else {
                    next();
                }
            }
        },
        function (next) {
            fs.stat(pathname, function (error, stats) {
                if (!error) {
                    exists = !!stats.isFile();
                }
                next();
            });
        },
        function () {
            if (useCache) {
                cache[filename] = exists;
            }
            if (useDebugger) {
                logger.getLogger("static").debug("Check file exists:", {
                    options : options,
                    memory  : false,
                    result  : exists
                });
            }
            callback(exists);
        }
    ]);
}

module.exports = staticExists;