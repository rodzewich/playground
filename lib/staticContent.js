/*jslint */
/*global module */

"use strict";

var fs           = require("fs"),
    path         = require("path"),
    types        = require("./types"),
    deferred     = require("./deferred"),
    staticExists = require("./staticExists"),
    cacheExists  = require("./cacheExists"),
    cacheContent = require("./cacheContent");

function staticContent (options, callback) {
    var type         = types.other,
        charset      = options.charset || "utf-8",
        filename     = options.filename,
        basedir      = options.basedir,
        useDebugger  = !!options.useDebugger,
        useCache     = !!options.useCache,
        useOnlyCache = !!options.useOnlyCache,
        pathname     = path.join(basedir, filename),
        checksum,
        content;

    deferred([

        function (next) {
            staticExists({
                basedir      : basedir,
                filename     : filename,
                useDebugger  : useDebugger,
                useCache     : useOnlyCache,
                useOnlyCache : useOnlyCache
            }, function (exists) {
                if (!exists) {
                    callback(new Error("bla bla bla"), null);
                } else {
                    next();
                }
            });
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
            if (useCache && filename in cacheContent) {
                callback(null, cacheContent[filename]);
            } else if (useOnlyCache) {
                if (useCache) {
                    cacheExists[filename] = false;
                }
                callback(new Error("bla bla bla"), null);
            } else {
                next();
            }
        },

        function () {
            fs.readFile(pathname, function (error, buffer) {
                if (!error) {
                    content = buffer;
                    if (useCache) {
                        cacheExists[filename] = true;
                        cacheContent[filename] = {
                            type     : type,
                            content  : content,
                            checksum : checksum
                        };
                    }
                    callback(null, {
                        type     : type,
                        content  : content,
                        checksum : checksum
                    });
                } else {
                    if (useCache) {
                        cacheExists[filename] = false;
                        delete cacheContent[filename];
                    }
                    callback(error, null);
                }
            });
        }
    ]);
}

module.exports = staticContent;