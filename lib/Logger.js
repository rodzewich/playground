/*jslint */
/*global module */

console.debug = console.log;
console.info = console.log;

var Level = {
    DEBUG : "debug",
    INFO  : "info",
    WARN  : "warn",
    ERROR : "error",
    FATAL : "fatal"
};

function Logger(name) {
    this.name = name;
}

Logger.prototype.name = null;

Logger.prototype.log = function (level, message, options) {
    if (["typescript"].indexOf(this.name) === -1) {
        console.log("[%s] %s [options:%j]", level, message, options || null);
    }
};

Logger.prototype.debug = function (message, options) {
    this.log(Level.DEBUG, message, options);
};

Logger.prototype.info = function (message, options) {
    this.log(Level.INFO, message, options);
};

Logger.prototype.warn = function (message, options) {
    this.log(Level.WARN, message, options);
};

Logger.prototype.error = function (message, options) {
    this.log(Level.ERROR, message, options);
};

Logger.prototype.fatal = function (message, options) {
    this.log(Level.FATAL, message, options);
};

Logger.getLogger = function (name) {
    return new Logger(name);
};

module.exports = Logger;
