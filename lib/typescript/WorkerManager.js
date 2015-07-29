/*jslint */
/*global */

var util = require('util');

/**
 * @name WorkerManager
 * @param options
 * @param options.numberOfProcesses
 * @constructor
 */
function WorkerManager(options) {

    var self = this;
    var numberOfProcesses = options.numberOfProcesses;

    self.ready = function () {};

    self.compile = function () {};

    self.destroy = function () {};

}

util.inherits(WorkerManager, EventEmitter);

module.exports = WorkerManager;