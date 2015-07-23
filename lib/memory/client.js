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
    var data = new Buffer(0);

    function getIdentifier() {
        return String(increment++);
    }

    function errorHandler(error) {
        console.log("error", error);
    }

    function dataHandler(buffer) {
        data = Buffer.concat([data, buffer]);

        if (data.slice(-4).toString("utf8") !== "\nEND") {
            return;
        }

        var options  = JSON.parse(data.slice(0, -4).toString("utf8")), // todo: error place
            id       = options.id,
            pid      = options.pid,
            response = options.response,
            callback = callbacks[id];

        data = new Buffer(0);

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
            client.write("\nEND");
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
            client.write("\nEND");
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
            client.write("\nEND");
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
            client.write("\nEND");
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
            client.write("\nEND");
        }

    };


}

module.exports = client;
