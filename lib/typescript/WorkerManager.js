/*jslint */
/*global */

var util = require('util');

/**
 * @name WorkerManager
 * @param {object} options
 * @param {number} options.numberOfProcesses
 * @param {string} options.sourcesDirectory
 * @param {string} [options.scriptsTarget="es5"]
 * @param {boolean} [options.useCache=false]
 * @constructor
 */
function WorkerManager(options) {

    var self              = this,
        numberOfProcesses = options.numberOfProcesses,
        sourcesDirectory  = options.sourcesDirectory,
        scriptsTarget     = options.scriptsTarget,
        useCache          = options.useCache;

    self.compile = function (filename, callback) {};

    self.destroy = function () {};

}

util.inherits(WorkerManager, EventEmitter);

module.exports = WorkerManager;