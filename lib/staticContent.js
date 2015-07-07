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

function staticContent (options, callback) {

    var type         = types.other,
        charset      = options.charset || "utf-8",
        filename     = options.filename,
        basedir      = options.basedir,
        useDebugger  = !!options.useDebugger,
        useCache     = !!options.useCache,
        pathname     = path.join(basedir, filename),
        date         = new Date(),
        mtime,
        content;

    deferred([

        function (next) {
            staticExists({
                basedir     : basedir,
                filename    : filename,
                useDebugger : useDebugger,
                useCache    : useCache
            }, function (result) {
                if (!result) {
                    callback(new Error("bla bla bla"), null);
                } else {
                    mtime = result;
                    next();
                }
            });
        },

        function (next) {
            if (filename in cacheContent && Number(cacheContent[filename].date) >= Number(mtime)) {
                callback(null, cacheContent[filename]);
            } else if (useCache) {
                cacheExists[filename] = false;
                callback(new Error("bla bla bla"), null);
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
                    cacheExists[filename] = date;
                    cacheContent[filename] = {
                        type    : type,
                        content : content,
                        date    : date
                    };
                    callback(null, {
                        type    : type,
                        content : content,
                        date    : date
                    });
                } else {
                    cacheExists[filename] = false;
                    delete cacheContent[filename];
                    callback(error, null);
                }
            }
            if (!locks[filename]) {
                locks[filename] = new EventEmitter();
                fs.readFile(pathname, function (error, buffer) {
                    handler(error, buffer);
                    locks[filename].emit("complete", error, buffer);
                    delete locks[filename];
                    next();
                });
            } else {
                locks[filename].addListener("complete", function (error, buffer) {
                    handler(error, buffer);
                    next();
                });
            }
        }

    ]);
}

module.exports = staticContent;