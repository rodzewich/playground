/*jslint */
/*global module */

var fs       = require("fs"),
    path     = require("path"),
    spawn    = require("child_process").spawn,
    deferred = require("./deferred"),
    cache    = {
        sources : {},
        results : {},
        maps    : {}
    };

function getSource(filename, callback) {
    function callCallback() {
        var args = arguments;
        setTimeout(function () {
            if (typeof callback === "function") {
                callback.apply(null, args);
            }
        }, 0).unref();
    }
    if (cache.sources[filename]) {
        callCallback(null, cache.sources[filename]);
    } else {
        callCallback(new Error("File not found"), null);
    }
}

function getMap(filename, callback) {
    function callCallback() {
        var args = arguments;
        setTimeout(function () {
            if (typeof callback === "function") {
                callback.apply(null, args);
            }
        }, 0).unref();
    }
    if (cache.maps[filename]) {
        callCallback(null, cache.maps[filename]);
    } else {
        callCallback(new Error("File not found"), null);
    }
}

function getResult(filename, callback) {
    var mtime,
        extname  = path.extname(filename),
        basename = path.basename(filename, extname),
        dirname  = path.dirname(filename),
        source   = path.format({
            dir  : dirname,
            name : basename,
            ext  : extname
        });
    deferred([
        function (next) {
            fs.stat(source, function (error, stats) {
                if (!error) {
                    mtime = stats.mtime;
                    if (!cache.results[filename] || cache.results[filename].mtime !== mtime) {
                        delete cache.results[filename];
                        delete cache.sources[filename];
                        delete cache.maps[filename];
                        next();
                    } else {
                        callback(null, cache.results[filename].content);
                    }
                } else {
                    callback(error, null);
                }
            });
        },
        function (next) {
            var execPath = process.execPath,
                process = spawn(execPath, args);
            process.stderr.on("data", function (data) {
                errors.push(String(data || ""));
            });
            process.stdout.on("data", function (data) {
                content += data.toString();
                errors.push(String(data || ""));
            });
        }
    ]);
}

module.exports = {
    getSource : getSource,
    getResult : getResult,
    getMap    : getMap
};