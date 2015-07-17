/*jslint */
/*global module */

/**
 * @param {*} value
 * @returns {string}
 */
function typeOf(value) {
    "use strict";

    var type  = String(Object.prototype.toString.call(value) || '').slice(8, -1) || 'Object',
        types = ['Arguments', 'Array', 'Boolean', 'Date', 'Error', 'Function', 'Null', 'Number', 'Object', 'String', 'Undefined'];

    if (types.indexOf(type) !== -1) {
        type = type.toLowerCase();
    }

    return type;

}

module.exports = typeOf;
