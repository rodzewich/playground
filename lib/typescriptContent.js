/*jslint */
/*global module */

"use strict";

var fs       = require("fs");
var path     = require("path");
var deferred = require("./deferred");
var parallel = require("./parallel");
var ts       = require("../typescript");
var cacheTypescript = {};

function typescriptContent(options, callback) {

    var filename   = options.filename,
        basedir    = options.basedir,
        useCache   = options.useCache,
        typescript = filename + ".ts",
        sourcemap  = filename + ".js.map",
        javascript = filename + ".js",
        errors     = [];

    var current;
    var files = [];

    function getReferences(filename, content) {
        return ts.preProcessFile(content, false).referencedFiles.map(function (item) {
            return path.resolve(path.dirname(filename), String(item.fileName));
        });
    }

    function readFile(filename, callback) {
        var resolve = path.join(basedir, filename);
        files.push(filename);
        deferred([
            function (next) {
                if (useCache && filename in cacheTypescript) {
                    callback(null, cacheTypescript[filename]);
                } else if (useCache) {
                    callback();
                }
            },
            function (next) {
                fs.stat(filename, function () {

                });
            },
            function () {
                fs.readFile(filename, function (err, buffer) {
                    var content;
                    if (!err) {
                        content = buffer.toString("utf8");
                        parallel(getReferences(filename, content).map(function (filename) {
                            if (files.indexOf(filename) === -1) {
                                return function (complete) {
                                    readFile(filename, function () {
                                        complete();
                                    });
                                };
                            }
                            return null;
                        }), function () {

                        });
                    } else {

                    }
                });
            }
        ]);
    }

    deferred([

        function (next) {
        }

    ]);
}

module.exports = typescriptContent;