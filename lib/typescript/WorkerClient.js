/*jslint */
/*global require, process */

var net          = require('net'),
    util         = require('util'),
    EventEmitter = require('events').EventEmitter,
    spawn        = require('child_process').spawn,
    path         = require('path'),
    deferred     = require("../deferred"),
    typeOf       = require("../typeOf");

function WorkerClient(options) {

    var socket,
        self         = this,
        connectLock  = false,
        connected    = false,
        childProcess = null,
        temporaryDirectory;

    var data = new Buffer(0);
    var identifier = 0;
    var callbacks = {};


    function generateIdentifier() {
        return identifier++;
    }

    function onError(error) {

    }

    function onData(buffer) {
        var index;
        data = Buffer.concat([data, buffer]);
        index = data.toString("ascii").indexOf("\n");
    }

    function onComplete(error) {
        socket.removeListener("error", onConnectionError);
        socket.on("error", onError);
        socket.on("data", onData);
        connected = !error;
        connectLock = false;
        self.emit("connect", error || null);
    }

    function onConnectionError(error) {
        onComplete(error);
    }

    function getResourceLocation() {
        return path.join(temporaryDirectory, "worker-" + self.getPid() + ".sock");
    }

    function disconnect() {}

    function connect() {
        if (!connectLock) {
            if (!connected) {
                deferred([
                    function (next) {
                        childProcess = spawn(process.execPath, [path.join(__dirname, "./WorkerProcess.js"), temporaryDirectory], {cwd: __dirname});
                        childProcess.on("error", onConnectionError); // todo: ???
                        childProcess.on("exit", function () {
                            // todo: disconnect
                            //next();
                        });
                        setTimeout(function () {
                            next();
                        }, 300);
                    },
                    function () {
                        socket = net.createConnection(getResourceLocation(), function () {
                            onComplete(null);
                        });
                        socket.on("error", onConnectionError);
                    }
                ]);
            } else {
                self.emit("connect", null);
            }
        }

    }

    if (!(self instanceof WorkerClient)) {
        throw new Error("Creating \"WorkerClient\" instance should be via only \"new\" operator.");
    }

    if (!path.isAbsolute(String(options.temporaryDirectory))) {
        throw new Error("Option \"temporaryDirectory\" should be absolute path in local file system.");
    }

    temporaryDirectory = String(options.temporaryDirectory);

    EventEmitter.call(self);

    /**
     * @function
     * @name WorkerClient#getPid
     * @return {number}
     */
    self.getPid = function () {
        if (childProcess) {
            return childProcess.pid || null;
        }
        return null;
    };

    /**
     * @function
     * @name WorkerClient#connect
     * @param {function} [callback]
     * @return {void}
     */
    self.connect = function (callback) {
        var self = this;
        if (typeOf(callback) === "function") {
            self.once("connect", callback);
        }
        connect();
    };

    /**
     * @function
     * @name WorkerClient#disconnect
     * @param {function} [callback]
     * @return {void}
     */
    self.disconnect = function (callback) {
        var self = this;
        if (typeOf(callback) === "function") {
            self.once("disconnect", callback);
        }
        disconnect();
    };

    /**
     * @function
     * @name WorkerClient#disconnect
     * @param {string} filename
     * @param {function} [callback]
     * @return {void}
     */
    self.compile = function (filename, callback) {
        var id;
        if (typeOf(callback) !== "function") {
            throw new Error("bla bla bla");
        }
        id = generateIdentifier();
        callbacks[id] = callback;
        client.write(JSON.stringify({
            id : id,
            filename : String(filename)
        }), "utf8");
        client.write("\n");
    };


}

util.inherits(WorkerClient, EventEmitter);

module.exports = WorkerClient;