/*jslint */
/*global module, require */

var path       = require("path"),
    typeOf     = require("../typeOf"),
    typescript = require("../../typescript"),
    ts         = typescript();

/**
 * @param {object} options
 * @return {string[]}
 */
function references(options) {
    "use strict";

    var filename,
        directory,
        content,
        withoutDefinitions,
        result;

    if (typeOf(options) !== "object") {
        throw new Error("bla bla bla");
    }

    filename           = String(options.filename);
    directory          = path.dirname(filename);
    content            = String(options.content || "");
    withoutDefinitions = !!options.withoutDefinitions;
    result             = [];

    ts.preProcessFile(content, false).referencedFiles.forEach(function (item) {
        var result     = path.join(directory, item.fileName),
            additional = result.substr(-3).toLowerCase(),
            extension  = result.substr(-3).toLowerCase();
        if (extension === ".ts" && result.substr(0, 2) !== "..") {
            if (additional !== ".d.ts" || (additional === ".d.ts" && !withoutDefinitions)) {
                result.push(result.substr(0, result.length - 3));
            }
        }
    });

    return result;

}

module.exports = references;
