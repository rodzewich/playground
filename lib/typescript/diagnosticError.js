/*jslint */
/*global module, require */

var util = require("util");

function DiagnosticError(message, code, category) {
    "use strict";
    this.name     = "DiagnosticError";
    this.message  = message + " [code: " + code + ", category: " + category + "]";
    this.code     = code;
    this.category = category;
    Error.captureStackTrace(this, DiagnosticError);
}

util.inherits(DiagnosticError, Error);

DiagnosticError.prototype.name = null;

DiagnosticError.prototype.message = null;

DiagnosticError.prototype.code = null;

DiagnosticError.prototype.category = null;

DiagnosticError.prototype.getMessage = function () {
    "use strict";
    return this.message;
};

DiagnosticError.prototype.getCode = function () {
    "use strict";
    return this.code;
};

DiagnosticError.prototype.getCategory = function () {
    "use strict";
    return this.category;
};

DiagnosticError.prototype.getName = function () {
    "use strict";
    return this.name;
};


module.exports = DiagnosticError;
