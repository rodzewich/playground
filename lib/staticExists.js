"use strict";

var path       = require("path"),
    fs         = require("fs"),
    deferred   = require("./deferred");

function staticExists (options, callback) {
    var exists   = false,
        filename = options.filename,
        basedir  = options.basedir,
        pathname = path.join(basedir, filename);
    deferred([
        function (next) {
            console.log("Check static content:", pathname);
            next();
        },
        function (next) {
            fs.exists(pathname, function (fileExists) {
                exists = !!fileExists;
                if (!exists) {
                    callback(exists);
                } else {
                    next();
                }
            });
        },
        function (next) {
            fs.stat(pathname, function (error, stats) {
                if (error) {
                    console.log("Error:", error);
                    exists = false;
                } else {
                    exists = !!stats.isFile();
                }
                next();
            });
        },
        function () {
            callback(exists);
        }
    ]);
}

module.exports = staticExists;