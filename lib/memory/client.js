/*jslint */
/*global module, require */

var net      = require("net");
var path     = require('path');
var spawn    = require('child_process').spawn;
var deferred = require("../deferred");

function client(options) {

    var socket = options.socket;
    var callbacks = {};
    var client;
    var increment = 0;
    var error = null;

    function getIdentifier() {
        return String(increment++);
    }

    function errorHandler(error) {
        console.log("error", error);
    }

    function dataHandler(data) {
        var options  = JSON.parse(data.toString("utf8")),
            id       = options.id,
            pid      = options.pid,
            response = options.response,
            callback = callbacks[id];
        if (pid === process.pid && typeof callback === "function") {
            delete callbacks[id];
            callback(response);
        }
    }

    return {

        connect: function (callback) {
            var instance;

            function completeHandler(error) {
                instance.removeListener("error", errorConnection);
                instance.on("error", errorHandler);
                instance.on("data", dataHandler);
                if (typeof callback === "function") {
                    callback(error);
                }
            }

            function errorConnection(error) {
                completeHandler(error);
            }

            instance = net.createConnection(socket, function () {
                client = instance;
                completeHandler(null);
            });

            instance.on("error", errorConnection);

        },

        setItem: function (key, value, callback) {
            var id      = getIdentifier(),
                request = JSON.stringify({
                    id        : id,
                    pid       : process.pid,
                    command   : "setItem",
                    argument1 : key || null,
                    argument2 : value || null
                });
            callbacks[id] = callback;
            client.write(request, "utf8");
            client.write("END");
        },

        getItem: function (key, callback) {
            var id      = getIdentifier(),
                request = JSON.stringify({
                    id        : id,
                    pid       : process.pid,
                    command   : "getItem",
                    argument1 : key || null
                });
            callbacks[id] = callback;
            client.write(request, "utf8");
            client.write("END");
        },

        removeItem: function (key, callback) {
            var id      = getIdentifier(),
                request = JSON.stringify({
                    id        : id,
                    pid       : process.pid,
                    command   : "removeItem",
                    argument1 : key || null
                });
            callbacks[id] = callback;
            client.write(request, "utf8");
            client.write("END");
        },

        key: function (index, callback) {
            var id      = getIdentifier(),
                request = JSON.stringify({
                    id        : id,
                    pid       : process.pid,
                    command   : "removeItem",
                    argument1 : index || null
                });
            callbacks[id] = callback;
            client.write(request, "utf8");
            client.write("END");
        },

        count: function (callback) {
            var id      = getIdentifier(),
                request = JSON.stringify({
                    id        : id,
                    pid       : process.pid,
                    command   : "length"
                });
            callbacks[id] = callback;
            client.write(request, "utf8");
            client.write("END");
        }

    };


}

module.exports = client;

var ins = client({socket: path.join(__dirname, "memory.socket")});
deferred([
    function (next) {
        ins.connect(function (error) {
            if (!error) {
                next();
            } else {
                console.log(error);
            }
        });
    },
    function (next) {
        ins.setItem("mykey", {key: JSON.stringify(new Array(10000).join("sdfsdf s df sd f sd f sd fs df s df sd f sd  sd fs df s\n"))}, function () {
            next();
        });
    },
    function (next) {
        ins.getItem("mykey", function (result) {
            console.log("result", result);
            next();
        });
    },
    function () {
        ins.count(function (result) {
            console.log("count", result);
        });
    }
]);
