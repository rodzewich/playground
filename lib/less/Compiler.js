/*jslint */
/*global module, require */

var util         = require('util'),
    path = require("path"),
    typeOf = require("../typeOf"),
    less = require("less"),
    EventEmitter = require('events').EventEmitter;

function Compiler(options) {
    "use strict";

    var self = this;
    var importPaths = [];

    // todo: проверять список путей
    importPaths = options.paths;

    EventEmitter.call(self);

    self.compile = function (callback) {
        less.render('@import (css) "index.css"; .class { width: (1 + 1) }', {
            paths    : ['.', './lib'],  // Specify search paths for @import directives
            filename : 'style.less', // Specify a filename, for better error messages
            compress : true,          // Minify CSS output
            sourceMap: true
        }, function (error, result) {
            if (error) {
                console.log("error:", error);
            } else {
                console.log(result);
            }
        });
    };

}

util.inherits(Compiler, EventEmitter);

module.extends = Compiler;