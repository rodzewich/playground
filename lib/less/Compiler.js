/*jslint */
/*global module, require, process */

var fs         = require('fs'),
    util         = require('util'),
    EventEmitter = require('events').EventEmitter,
    path         = require('path'),
    deferred     = require("../deferred"),
    typeOf       = require("../typeOf"),
    less         = require("less");

function Compiler(options) {

    var self = this,
        importPaths = [];

    self.compile = function (filename, callback) {

        var resolve,
            errors = [],
            content;

        deferred([

            // connect to memory
            /*function (next) {
                client = memory({
                    socket    : memorySocketLocation,
                    namespace : "typescript"
                });
                // todo: skip connect
                client.connect(function (error) {
                    if (!error) {
                        next();
                    } else {
                        done([error], null);
                    }
                });
            },*/

            function (done) {
                var actions = importPaths.map(function (path) {
                    return function (next) {
                        resolve = path.join(path, filename + ".less");
                        fs.stat(resolve, function (error, stats) {
                            if (!error && stats.isFile()) {
                                done();
                            } else {
                                if (error) {
                                    errors.push(error);
                                }
                                next();
                            }
                        });
                    };
                });
                actions.push(function () {
                    callback(errors, null);
                });
            },

            function (next) {
                errors = [];
                fs.readFile(resolve, function (error, buffer) {
                    if (!error) {
                        content = buffer.toString("utf8");
                        next();
                    } else {
                        callback([error], null);
                    }
                });
            },

            function (next) {
                less.render(content, {

                }, function (error, result) {

                });
            }

        ]);

    };

}

util.inherits(Compiler, EventEmitter);

module.exports = Compiler;