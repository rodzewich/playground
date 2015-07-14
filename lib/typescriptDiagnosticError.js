/*jslint */
/*global module, require */

"use strict";

var utils = require("utils");

function DiagnosticError(message, code, category) {
    this.name     = "DiagnosticError";
    this.message  = message;
    this.code     = code;
    this.category = category;
    Error.captureStackTrace(this, DiagnosticError);
}

utils.inherits(DiagnosticError, Error);

DiagnosticError.prototype.name = null;

DiagnosticError.prototype.message = null;

DiagnosticError.prototype.code = null;

DiagnosticError.prototype.category = null;

DiagnosticError.prototype.getMessage = function () {
    return this.message;
};

DiagnosticError.prototype.getCode = function () {
    return this.code;
};

DiagnosticError.prototype.getCategory = function () {
    return this.category;
};

DiagnosticError.prototype.getName = function () {
    return this.name;
};


module.exports = DiagnosticError;