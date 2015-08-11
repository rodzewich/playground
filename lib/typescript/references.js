/*jslint */
/*global module, require */

var path       = require("path"),
    typescript = require("../../typescript"),
    ts         = typescript();

function references(options) {
    "use strict";

    var filename           = String(options.filename),
        directory          = path.dirname(filename),
        content            = String(options.content || ""),
        withoutDefinitions = !!options.withoutDefinitions;
    ts.preProcessFile(content, false).referencedFiles.forEach(function (item) {
        var result     = path.join(directory, item.fileName),
            additional = result.substr(-3).toLowerCase(),
            extension  = result.substr(-3).toLowerCase();
        if (extension === ".ts" && result.substr(0, 2) !== "..") {
            if (additional !== ".d.ts" || (additional === ".d.ts" && !withoutDefinitions)) {
                fileReferences.push(result.substr(0, result.length - 3));
            }
        }
    });

}

module.exports = references;
