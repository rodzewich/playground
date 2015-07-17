/*jslint */
/*global module */

var fs       = require("fs"),
    path     = require("path"),
    deferred = require("./deferred");

function lock(options, callback) {
    var temp     = String(options.temp || ""),
        timeout  = Math.max(0, parseInt(String(options.timeout), 10) || 0) || 100,
        filename = path.join(temp, options.filename) + ".lock",
        dirname  = path.dirname(filename),
        actions  = [],
        fd;

    function unlock() {
        deferred([
            function (next) {
                fs.write(fd, String(process.pid), function () {
                    next();
                });
            },
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
        var dirname = array.slice(0, index + 1).join(path.sep);
        actions.push(function (next) {
            fs.mkdir(dirname, function (error) {
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
            fs.open(filename, "w+", function (error, descriptor) {
                if (!error) {
                    fd = descriptor;
                    next();
                } else if (error.code === "EEXIST") {
                    setTimeout(process, timeout);
                } else {
                    callback(error, null);
                }
            });
        }
        process();
    });
    actions.push(function () {
        callback(null, unlock);
    });
    deferred(actions);
}

module.exports = lock;