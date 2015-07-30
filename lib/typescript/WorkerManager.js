/*jslint */
/*global */

var util         = require('util'),
    EventEmitter = require("events").EventEmitter,
    WorkerClient = require("./WorkerClient");
var parallel = require("../parallel");

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
        numberOfProcesses = Math.max(1, parseInt(String(options.numberOfProcesses), 10) || 0),
        sourcesDirectory  = String(options.sourcesDirectory),// todo: check: only absolute
        scriptsTarget     = options.scriptsTarget,// todo: check: es3, es5
        useCache          = !!options.useCache,
        workerPool        = [],
        connected         = false,
        lock;

    self.connect = function (callback) {
        var errors, workers, actions;
        self.once("connect", callback);
        if (!lock && !connected) {
            lock    = true;
            errors  = [];
            workers = new Array(numberOfProcesses);
            actions = workers.map(function () {
                return function (done) {
                    var worker = new WorkerClient({
                        sourcesDirectory : sourcesDirectory,
                        scriptsTarget    : scriptsTarget,
                        useCache         : useCache
                    });
                    worker.connect(function (error) {
                        if (!error) {
                            workerPool.push(worker);
                        } else {
                            errors.push(error);
                        }
                        done();
                    });
                }
            });
            parallel(actions, function () {
                if (!errors.length) {
                    lock = false;
                    connected = true;
                    self.emit("connect", null);
                } else {
                    self.destroy(function () {
                        lock = false;
                        connected = false;
                        self.emit("connect", errors);
                    })
                }
            });
        } else if (connected) {
            self.emit("connect", null);
        }
    };

    self.compile = function (filename, callback) {
        if (!connected) {
            throw new Error("bla bla bla");
        }
    };

    self.destroy = function (callback) {};

}

util.inherits(WorkerManager, EventEmitter);

module.exports = WorkerManager;