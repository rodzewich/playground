/*jslint */
/*global module */

"use strict";

var deferred = require("./deferred");
var fs = require("fs");
var ts = require("../typescript");

function typescriptContent(options, callback) {

    function getReferences(filename, content) {
        return ts.preProcessFile(content, false).referencedFiles.map(function (item) {
            return path.resolve(path.dirname(filename), String(item.fileName));
        });
    }


    function readFile() {
        fs.readFile();
    }

    deferred([

        function (next) {
        }

    ]);
}

module.exports = typescriptContent;