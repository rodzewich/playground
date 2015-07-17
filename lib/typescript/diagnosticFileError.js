/*jslint */
/*global module, require */

var util = require("util");

function DiagnosticFileError(message, filename, line, character) {
    "use strict";

    this.name      = "DiagnosticFileError";
    this.message   = message + " [" + filename + " on line " + line + ":" + character + "]";
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
    "use strict";
    return this.message;
};

DiagnosticFileError.prototype.getFilename = function () {
    "use strict";
    return this.filename;
};

DiagnosticFileError.prototype.getLine = function () {
    "use strict";
    return this.line;
};

DiagnosticFileError.prototype.getCharacter = function () {
    "use strict";
    return this.character;
};

DiagnosticFileError.prototype.getName = function () {
    "use strict";
    return this.name;
};


module.exports = DiagnosticFileError;
