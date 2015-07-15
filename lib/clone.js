/*jslint */
/*global module */

function clone(object, recursive) {
    var result = {};
    var prop;
    if (object) {
        for (prop in object) {
            if (!object.hasOwnProperty(prop)) {
                continue;
            }
            result[prop] = object[prop];
        }
    }
    return result;
}

module.exports = clone;