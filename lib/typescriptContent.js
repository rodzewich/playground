/*jslint */
/*global module */

"use strict";

var fs       = require("fs");
var path     = require("path");
var deferred = require("./deferred");
var parallel = require("./parallel");
var ts       = require("../typescript");

function typescriptContent(options, callback) {

    var filename   = options.filename,
        typescript = filename + ".ts",
        sourcemap  = filename + ".js.map",
        javascript = filename + ".js",
        errors     = [];

    function getReferences(filename, content) {
        return ts.preProcessFile(content, false).referencedFiles.map(function (item) {
            return path.resolve(path.dirname(filename), String(item.fileName));
        });
    }


    function readFile(filename, callback) {
        fs.readFile(filename, function (err, buffer) {
            if (!err) {
                parallel(getReferences(filename, buffer.toString("utf8")).map(function (filename) {
                    return function (complete) {
                        readFile(filename, function () {
                            complete();
                        });
                    };
                }), function () {

                });
            } else {

            }
        });
    }

    deferred([

        function (next) {
        }

    ]);
}

module.exports = typescriptContent;