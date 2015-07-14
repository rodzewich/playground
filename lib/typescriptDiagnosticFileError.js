/*jslint */
/*global module */

function TypescriptDiagnosticFileError(message, filename, line, character) {
    this._message   = message;
    this._filename  = filename;
    this._line      = line;
    this._character = character;
}

TypescriptDiagnosticFileError.prototype._message = null;

TypescriptDiagnosticFileError.prototype._filename = null;

TypescriptDiagnosticFileError.prototype._line = null;

TypescriptDiagnosticFileError.prototype._character = null;

TypescriptDiagnosticFileError.prototype.getMessage = function () {
    return this._message;
};

TypescriptDiagnosticFileError.prototype.getFilename = function () {
    return this._filename;
};

TypescriptDiagnosticFileError.prototype.getLine = function () {
    return this._line;
};

TypescriptDiagnosticFileError.prototype.getCharacter = function () {
    return this._character;
};

module.exports = TypescriptDiagnosticFileError;