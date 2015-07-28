/*jslint */
/*global module, require, process, Buffer, Error */

// todo: 1. добавить логирование!
// todo: 2. дописать дисконект
// todo: 3. дописать постоянные соединения через pool
// todo: 4. дописать hasNamespace, getNamespaces, removeNamespace
// todo: 5. сделать пинг
// todo: 6. implement smart connect

var net    = require("net"),
    path   = require("path"),
    typeOf = require("../typeOf"),
    connectionPool = {};

/**
 * @param {object} options
 * @param {string} options.socket
 * @param {number} [options.connectionPool=0]
 * @param {string} [options.namespace="default"]
 * @return {object}
 */
function client(options) {
    "use strict";

    var client,
        socket    = String(options.socket),
        poolSize  = Math.max(0, parseInt(String(options.connectionPool), 10) || 0),
        namespace = String(options.namespace || "default"),
        data      = new Buffer(0),
        callbacks = [],
        lock      = false,
        queue     = [];

    function analyzeQueue() {
        var callback;
        if (!lock && queue.length !== 0) {
            lock     = true;
            callback = queue.shift();
            callback();
        }
    }

    function onError(error) {
        console.log("error", error);
    }

    function onData(buffer) {
        data = Buffer.concat([data, buffer]);

        if (data.slice(-4).toString("utf8") !== "\nEND") {
            return;
        }

        var options  = JSON.parse(data.slice(0, -4).toString("utf8")), // todo: error place
            response = options.response,
            error    = null,
            callback = callbacks.shift();

        data = new Buffer(0);

        if (options.error) {
            error = new Error(options.error);
        }

        if (typeOf(callback) === "function") {
            lock = false;
            callback(error, response);
            analyzeQueue();
        }
    }

    return {

        connect : function (callback) {
            var instance;

            function onComplete(error) {
                instance.removeListener("error", onConnectionError);
                instance.on("error", onError);
                instance.on("data", onData);
                if (typeOf(callback) === "function") {
                    callback(error);
                }
            }

            function onConnectionError(error) {
                onComplete(error);
            }

            instance = net.createConnection(socket, function () {
                client = instance;
                onComplete(null);
            });

            instance.on("error", onConnectionError);

        },

        disconnect : function () {
        },

        getItem : function (key, callback) {
            queue.push(function () {
                var request = JSON.stringify({
                    command   : "getItem",
                    namespace : namespace,
                    argument1 : key || null
                });
                callbacks.push(callback);
                client.write(request, "utf8");
                client.write("\nEND");
            });
            analyzeQueue();
        },

        getItems : function (keys, callback) {
            queue.push(function () {
                var request = JSON.stringify({
                    command   : "getItems",
                    namespace : namespace,
                    argument1 : keys || null
                });
                callbacks.push(callback);
                client.write(request, "utf8");
                client.write("\nEND");
            });
            analyzeQueue();
        },

        setItem : function (key, value, callback) {
            queue.push(function () {
                var request = JSON.stringify({
                    command   : "setItem",
                    namespace : namespace,
                    argument1 : key || null,
                    argument2 : value || null
                });
                callbacks.push(function (error) {
                    if (typeOf(callback) === "function") {
                        callback(error);
                    }
                });
                client.write(request, "utf8");
                client.write("\nEND");
            });
            analyzeQueue();
        },

        setItems : function (data, callback) {
            queue.push(function () {
                var request = JSON.stringify({
                    command   : "setItems",
                    namespace : namespace,
                    argument1 : data || null
                });
                callbacks.push(function (error) {
                    if (typeOf(callback) === "function") {
                        callback(error);
                    }
                });
                client.write(request, "utf8");
                client.write("\nEND");
            });
            analyzeQueue();
        },

        removeItem : function (key, callback) {
            queue.push(function () {
                var request = JSON.stringify({
                    command   : "removeItem",
                    namespace : namespace,
                    argument1 : key || null
                });
                callbacks.push(function (error) {
                    if (typeOf(callback) === "function") {
                        callback(error);
                    }
                });
                client.write(request, "utf8");
                client.write("\nEND");
            });
            analyzeQueue();
        },

        removeItems : function (keys, callback) {
            queue.push(function () {
                var request = JSON.stringify({
                    command   : "removeItems",
                    namespace : namespace,
                    argument1 : keys || null
                });
                callbacks.push(function (error) {
                    if (typeOf(callback) === "function") {
                        callback(error);
                    }
                });
                client.write(request, "utf8");
                client.write("\nEND");
            });
            analyzeQueue();
        },

        hasItem : function (key, callback) {
            queue.push(function () {
                var request = JSON.stringify({
                    command   : "hasItem",
                    namespace : namespace,
                    argument1 : key || null
                });
                callbacks.push(callback);
                client.write(request, "utf8");
                client.write("\nEND");
            });
            analyzeQueue();
        },

        hasItems : function (keys, callback) {
            queue.push(function () {
                var request = JSON.stringify({
                    command   : "hasItems",
                    namespace : namespace,
                    argument1 : keys || null
                });
                callbacks.push(callback);
                client.write(request, "utf8");
                client.write("\nEND");
            });
            analyzeQueue();
        },

        getKey: function (index, callback) {
            queue.push(function () {
                var request = JSON.stringify({
                    command   : "getKey",
                    namespace : namespace,
                    argument1 : index || null
                });
                callbacks.push(callback);
                client.write(request, "utf8");
                client.write("\nEND");
            });
            analyzeQueue();
        },

        getKeys: function (indexes, callback) {
            queue.push(function () {
                var request = JSON.stringify({
                    command   : "getKeys",
                    namespace : namespace,
                    argument1 : indexes || null
                });
                callbacks.push(callback);
                client.write(request, "utf8");
                client.write("\nEND");
            });
            analyzeQueue();
        },

        getLength : function (callback) {
            queue.push(function () {
                var request = JSON.stringify({
                    command : "getLength",
                    namespace : namespace
                });
                callbacks.push(callback);
                client.write(request, "utf8");
                client.write("\nEND");
            });
            analyzeQueue();
        },

        lock : function (key, callback) {
            function unlock(callback) {
                queue.push(function () {
                    var request = JSON.stringify({
                        command   : "unlock",
                        namespace : namespace,
                        argument1 : key || null
                    });
                    callbacks.push(callback);
                    client.write(request, "utf8");
                    client.write("\nEND");
                });
                analyzeQueue();
            }
            queue.push(function () {
                var request = JSON.stringify({
                    command   : "lock",
                    namespace : namespace,
                    argument1 : key || null
                });
                callbacks.push(function (error) {
                    if (typeOf(callback) === "function") {
                        callback(error, unlock);
                    }
                });
                client.write(request, "utf8");
                client.write("\nEND");
            });
            analyzeQueue();
        }

    };

}

module.exports = client;
