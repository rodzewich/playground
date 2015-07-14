/*jslint */
/*global module, require */

"use strict";

var util = require("util");

function DiagnosticFileError(message, filename, line, character) {
    this.name      = "DiagnosticFileError";
    this.message   = message;
    this.filename  = filename;
    this.line      = line;
    this.character = character;
    Error.captureStackTrace(this, DiagnosticFileError);
}

util.inherits(DiagnosticFileError, Error);

DiagnosticFileError.prototype.name = null;

DiagnosticFileError.prototype.message = null;

DiagnosticFileError.prototype.filename = null;

DiagnosticFileError.prototype.line = null;

DiagnosticFileError.prototype.character = null;

DiagnosticFileError.prototype.getMessage = function () {
    return this.message;
};

DiagnosticFileError.prototype.getFilename = function () {
    return this.filename;
};

DiagnosticFileError.prototype.getLine = function () {
    return this.line;
};

DiagnosticFileError.prototype.getCharacter = function () {
    return this.character;
};

DiagnosticFileError.prototype.getName = function () {
    return this.name;
};


module.exports = DiagnosticFileError;
