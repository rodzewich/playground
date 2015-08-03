/*jslint */
/*global module, require */

var util         = require('util'),
    EventEmitter = require('events').EventEmitter;

function WorkerClient(options) {
    "use strict";

    var self = this;

    EventEmitter.call(self);

}

util.inherits(WorkerClient, EventEmitter);

module.extends = WorkerClient;