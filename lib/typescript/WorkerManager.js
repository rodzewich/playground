/*jslint */
/*global module, require */

var util         = require('util'),
    EventEmitter = require("events").EventEmitter,
    WorkerClient = require("./WorkerClient"),
    parallel     = require("../parallel"),
    typeOf       = require("../typeOf");

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
    "use strict";

    var self               = this,
        numberOfProcesses  = Math.max(1, parseInt(String(options.numberOfProcesses), 10) || 0),
        sourcesDirectory   = String(options.sourcesDirectory),// todo: check: only absolute
        temporaryDirectory = String(options.temporaryDirectory),// todo: check: only absolute
        scriptsTarget      = String(options.scriptsTarget || "es5").toLowerCase(),
        useCache           = !!options.useCache,
        workerPool         = [],
        connected          = false,
        stack              = [],
        lock;

    function checkAvailableWorkers() {
        var callback;
        if (workerPool.length && stack.length) {
            callback = stack.shift();
            callback();
        }
    }

    if (["es3", "es5"].indexOf(scriptsTarget) === -1) {
        throw new Error("bla bla bla");
    }

    /**
     * @public
     * @function
     * @name WorkerManager#connect
     * @param {function} [callback]
     * @return {void}
     */
    self.connect = function (callback) {
        var errors, actions;
        var index;

        function createClient(done) {
            var worker = new WorkerClient({
                sourcesDirectory   : sourcesDirectory,
                temporaryDirectory : temporaryDirectory,
                scriptsTarget      : scriptsTarget,
                useCache           : useCache
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


        if (typeOf(callback) === "function") {
            self.once("connect", callback);
        }
        if (!lock && !connected) {
            lock    = true;
            errors  = [];
            actions = [];
            for (index = 0; index < numberOfProcesses; index++) {
                actions.push(createClient);
            }
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
                    });
                }
            });
        } else if (connected) {
            self.emit("connect", null);
        }
    };

    /**
     * @public
     * @function
     * @name WorkerManager#compile
     * @param {string} filename
     * @param {function} [callback]
     * @return {void}
     */
    self.compile = function (filename, callback) {
        if (!connected) {
            throw new Error("bla bla bla");
        }
        stack.push(function () {
            var worker = workerPool.shift();
            worker.compile(filename, function (error, result) {
                workerPool.push(worker);
                if (typeOf(callback) === "function") {
                    callback(error || null, result || null);
                }
                checkAvailableWorkers();
            });
        });
        checkAvailableWorkers();
    };

    /**
     * @public
     * @function
     * @name WorkerManager#destroy
     * @param {function} [callback]
     * @return {void}
     */
    self.destroy = function (callback) {
        connected = false;
    };

}

util.inherits(WorkerManager, EventEmitter);

module.exports = WorkerManager;