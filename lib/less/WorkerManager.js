/*jslint */
/*global module, require */

var util         = require('util'),
    EventEmitter = require('events').EventEmitter;

function WorkerManager(options) {
    "use strict";

    var self = this;

    EventEmitter.call(self);

}

util.inherits(WorkerManager, EventEmitter);

module.extends = WorkerManager;