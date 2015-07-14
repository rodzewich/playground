/*jslint */
/*global module */

function TypescriptDiagnosticError(message, code, category) {
    this._message  = message;
    this._code     = code;
    this._category = category;
}

TypescriptDiagnosticError.prototype._message = null;

TypescriptDiagnosticError.prototype._code = null;

TypescriptDiagnosticError.prototype._category = null;

TypescriptDiagnosticError.prototype.getMessage = function () {
    return this._message;
};

TypescriptDiagnosticError.prototype.getCode = function () {
    return this._code;
};

TypescriptDiagnosticError.prototype.getCategory = function () {
    return this._category;
};


module.exports = TypescriptDiagnosticError;