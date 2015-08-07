/*jslint */
/*global require, module */

var util = require('util');

function LessError(error) {
    "use strict";
    this.name    = error.type + "Error";
    this.message = error.message + " in " + error.filename + " on line " + error.line + ", column " + error.column + ".";
    Error.captureStackTrace(this, LessError);
}

util.inherits(LessError, Error);

LessError.prototype.name = null;

LessError.prototype.message = null;

LessError.prototype.getMessage = function () {
    "use strict";
    return this.message;
};

module.exports = LessError;
