/*jslint */
/*global module, require */

var util         = require('util'),
    EventEmitter = require('events').EventEmitter;

function Compiler(options) {
    "use strict";

    var self = this;

    EventEmitter.call(self);

    self.compile = function (callback) {

    };

}

util.inherits(Compiler, EventEmitter);

module.extends = Compiler;