/*jslint */
/*global module, process, require, setTimeout */

var fs       = require("fs"),
    path     = require("path"),
    deferred = require("./deferred");

/**
 * @param {object} options
 * @param {string} options.temp
 * @param {string} options.filename
 * @param {number} [options.timeout=100]
 * @param {function} callback
 */
function lock(options, callback) {
    "use strict";

    var temp     = String(options.temp || ""),
        timeout  = Math.max(0, parseInt(String(options.timeout), 10) || 0) || 100,
        filename = path.join(temp, options.filename) + ".lock",
        dirname  = path.dirname(filename),
        actions  = [],
        fd;

    function unlock() {
        deferred([
            function (next) {
                fs.close(fd, function () {
                    next();
                });
            },
            function (next) {
                fs.unlink(filename, function () {
                    next();
                });
            }
        ]);
    }

    dirname.split(path.sep).forEach(function (element, index, array) {
        var directory = array.slice(0, index + 1).join(path.sep);
        actions.push(function (next) {
            fs.mkdir(directory, function (error) {
                if (!error || error.code === "EEXIST") {
                    next();
                } else {
                    callback(error, null);
                }
            });
        });
    });

    actions.push(function (next) {
        function process() {
            fs.open(filename, "wx+", function (error, descriptor) {
                if (!error) {
                    fd = descriptor;
                    next();
                } else if (error.code === "EEXIST") {
                    setTimeout(process, timeout).ref();
                } else {
                    callback(error, null);
                }
            });
        }
        process();
    });

    actions.push(function (next) {
        fs.write(fd, JSON.stringify({pid: process.pid}), function (error) {
            if (!error) {
                next();
            } else {
                callback(error, null);
            }
        });
    });

    actions.push(function () {
        callback(null, unlock);
    });

    deferred(actions);

}

module.exports = lock;