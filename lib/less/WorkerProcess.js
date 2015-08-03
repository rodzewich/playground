/*jslint */
/*global module, require */

var util         = require('util'),
    EventEmitter = require('events').EventEmitter;

function WorkerProcess(options) {
    "use strict";

    var self = this;

    EventEmitter.call(self);

}

util.inherits(WorkerProcess, EventEmitter);

module.extends = WorkerProcess;