/*jslint */
/*global module */

"use strict";

var fs           = require("fs"),
    path         = require("path"),
    staticExists = require("./staticExists"),
    cacheExists  = require("./cacheExists"),
    cacheContent = require("./cacheContent");

function staticContent (options, callback) {
    var type         = types.other,
        filename     = options.filename,
        basedir      = options.basedir,
        useDebugger  = !!options.useDebugger,
        useCache     = !!options.useCache,
        useOnlyCache = !!options.useOnlyCache,
        pathname     = path.join(basedir, filename),
        content;
    deferred([
        function (next) {
            staticExists({
                basedir      : basedir,
                filename     : filename,
                useDebugger  : useDebugger,
                useCache     : useCache,
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
            fs.readFile(pathname, function (error, buffer) {
                if (!error) {
                    content = buffer;
                } else {

                }
            });
        },

        function (next) {
            console.log("Load static content:", pathname);
            next();
        },
        function () {
            callback();
        }
    ]);
}

module.exports = staticContent;