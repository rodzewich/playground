/*jslint */
/*global module, require, process, Buffer */

// todo: 1. сделать так, чтобы команды ждали друг друга!
// todo: 3. дописать lock, unlock

var net  = require("net"),
    path = require('path');

function client(options) {
    "use strict";

    var client,
        socket    = options.socket,
        data      = new Buffer(0),
        callbacks = {},
        increment = 0;

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
            response = options.response,
            callback = callbacks[id];

        data = new Buffer(0);

        if (typeof callback === "function") {
            delete callbacks[id];
            callback(response);
        }
    }

    return {

        connect : function (callback) {
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

        getItem : function (key, callback) {
            var id = getIdentifier(),
                request = JSON.stringify({
                    id        : id,
                    command   : "getItem",
                    argument1 : key || null
                });
            callbacks[id] = callback;
            client.write(request, "utf8");
            client.write("\nEND");
        },

        getItems : function (keys, callback) {
            var id = getIdentifier(),
                request = JSON.stringify({
                    id        : id,
                    command   : "getItems",
                    argument1 : keys || null
                });
            callbacks[id] = callback;
            client.write(request, "utf8");
            client.write("\nEND");
        },

        setItem : function (key, value, callback) {
            var id = getIdentifier(),
                request = JSON.stringify({
                    id        : id,
                    command   : "setItem",
                    argument1 : key || null,
                    argument2 : value || null
                });
            callbacks[id] = callback;
            client.write(request, "utf8");
            client.write("\nEND");
        },

        setItems : function (data, callback) {
            var id = getIdentifier(),
                request = JSON.stringify({
                    id        : id,
                    command   : "setItems",
                    argument1 : data || null
                });
            callbacks[id] = callback;
            client.write(request, "utf8");
            client.write("\nEND");
        },

        removeItem : function (key, callback) {
            var id = getIdentifier(),
                request = JSON.stringify({
                    id        : id,
                    command   : "removeItem",
                    argument1 : key || null
                });
            callbacks[id] = callback;
            client.write(request, "utf8");
            client.write("\nEND");
        },

        removeItems : function (keys, callback) {
            var id = getIdentifier(),
                request = JSON.stringify({
                    id        : id,
                    command   : "removeItems",
                    argument1 : keys || null
                });
            callbacks[id] = callback;
            client.write(request, "utf8");
            client.write("\nEND");
        },

        hasItem : function (key, callback) {
            var id = getIdentifier(),
                request = JSON.stringify({
                    id        : id,
                    command   : "hasItem",
                    argument1 : key || null
                });
            callbacks[id] = callback;
            client.write(request, "utf8");
            client.write("\nEND");
        },

        hasItems : function (keys, callback) {
            var id = getIdentifier(),
                request = JSON.stringify({
                    id        : id,
                    command   : "hasItems",
                    argument1 : keys || null
                });
            callbacks[id] = callback;
            client.write(request, "utf8");
            client.write("\nEND");
        },

        getKey: function (index, callback) {
            var id = getIdentifier(),
                request = JSON.stringify({
                    id        : id,
                    command   : "getKey",
                    argument1 : index || null
                });
            callbacks[id] = callback;
            client.write(request, "utf8");
            client.write("\nEND");
        },

        getKeys: function (indexes, callback) {
            var id = getIdentifier(),
                request = JSON.stringify({
                    id        : id,
                    command   : "getKeys",
                    argument1 : indexes || null
                });
            callbacks[id] = callback;
            client.write(request, "utf8");
            client.write("\nEND");
        },

        getLength : function (callback) {
            var id = getIdentifier(),
                request = JSON.stringify({
                    id      : id,
                    command : "getLength"
                });
            callbacks[id] = callback;
            client.write(request, "utf8");
            client.write("\nEND");
        },

        lock : function (key, callback) {

        }

    };

}

module.exports = client;
