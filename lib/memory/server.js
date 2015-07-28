/*jslint */
/*global module, require, Buffer */

// todo: 1. добавить логирование
// todo: 2. дописать lock, unlock
// todo: 3. обрабатывать namespace'ы
// todo: 4. сделать пинг

var net    = require("net"),
    path   = require("path"),
    typeOf = require("../typeOf"),
    memory = {},
    lengths = {},
    locks  = {},
    server = net.createServer(function (socket) {

        // todo: save info to log
        //console.log("client connected");

        var data = new Buffer(0);

        function getItem(request) {
            var key       = String(request.argument1),
                namespace = String(request.namespace),
                values    = memory[namespace] || {};
            socket.write(JSON.stringify({
                id       : request.id,
                response : values[key] || null
            }));
            socket.write("\nEND");
        }

        function getItems(request) {
            var keys      = request.argument1,
                namespace = String(request.namespace),
                values    = memory[namespace] || {},
                result    = {},
                length,
                index,
                key;
            if (typeOf(keys) === "array") {
                length = keys.length;
                for (index = 0; index < length; index++) {
                    key = String(keys[index]);
                    if (key in values) {
                        result[key] = values[key] || null;
                    }
                }
            }
            socket.write(JSON.stringify({
                id       : request.id,
                response : result
            }));
            socket.write("\nEND");
        }

        function setItem(request) {
            var key       = String(request.argument1),
                namespace = String(request.namespace),
                values;
            if (!memory[namespace]) {
                memory[namespace] = {};
            }
            values             = memory[namespace];
            values[key]        = request.argument2 || null;
            lengths[namespace] = Object.keys(values).length;
            socket.write(JSON.stringify({
                id       : request.id,
                response : null
            }));
            socket.write("\nEND");
        }

        function setItems(request) {
            var data      = request.argument1,
                namespace = String(request.namespace),
                values,
                key;
            if (!memory[namespace]) {
                memory[namespace] = {};
            }
            values = memory[namespace];
            if (typeOf(data) === "object") {
                for (key in data) {
                    if (!data.hasOwnProperty(key)) {
                        continue;
                    }
                    values[key] = data[key] || null;
                }
            }
            lengths[namespace] = Object.keys(values).length;
            socket.write(JSON.stringify({
                id       : request.id,
                response : null
            }));
            socket.write("\nEND");
        }

        function hasItem(request) {
            var key       = String(request.argument1),
                namespace = String(request.namespace),
                values    = memory[namespace] || {};
            socket.write(JSON.stringify({
                id       : request.id,
                response : key in values
            }));
            socket.write("\nEND");
        }

        function hasItems(request) {
            var keys      = request.argument1,
                result    = true,
                namespace = String(request.namespace),
                values    = memory[namespace] || {},
                length,
                index,
                key;
            if (typeOf(keys) === "array" && keys.length) {
                length = keys.length;
                for (index = 0; index < length; index++) {
                    key    = String(keys[index]);
                    result = result && (key in values);
                    if (!result) {
                        break;
                    }
                }
            } else {
                result = false;
            }
            socket.write(JSON.stringify({
                id       : request.id,
                response : result
            }));
            socket.write("\nEND");
        }

        function removeItem(request) {
            var key       = String(request.argument1),
                namespace = String(request.namespace),
                values;
            if (!memory[namespace]) {
                memory[namespace] = {};
            }
            values             = memory[namespace];
            delete values[key];
            lengths[namespace] = Object.keys(values).length;
            socket.write(JSON.stringify({
                id       : request.id,
                response : null
            }));
            socket.write("\nEND");
        }

        function removeItems(request) {
            var keys      = request.argument1,
                namespace = String(request.namespace),
                values,
                index,
                len,
                key;
            if (!memory[namespace]) {
                memory[namespace] = {};
            }
            values = memory[namespace];
            if (typeOf(keys) === "array") {
                len = keys.length;
                for (index = 0; index < len; index++) {
                    key = String(keys[index]);
                    delete values[key];
                }
            }
            lengths[namespace] = Object.keys(values).length;
            socket.write(JSON.stringify({
                id       : request.id,
                response : null
            }));
            socket.write("\nEND");
        }

        function getLength(request) {
            var namespace = String(request.namespace);
            socket.write(JSON.stringify({
                id       : request.id,
                response : lengths[namespace] || {}
            }));
            socket.write("\nEND");
        }

        function getKey(request) {
            var index     = Math.max(0, parseInt(String(request.argument1), 10) || 0),
                namespace = String(request.namespace),
                values    = memory[namespace] || {};
            socket.write(JSON.stringify({
                id       : request.id,
                response : Object.keys(values)[index] || null
            }));
            socket.write("\nEND");
        }

        function getKeys(request) {
            var indexes   = request.argument1,
                namespace = String(request.namespace),
                values    = memory[namespace] || {},
                result    = [],
                length,
                value,
                index,
                keys;
            if (typeOf(indexes) === "array") {
                keys   = Object.keys(values);
                length = indexes.length;
                for (index = 0; index < length; index++) {
                    value = keys[Math.max(0, parseInt(String(indexes[index]), 10))] || null;
                    result.push(value);
                }
            }
            socket.write(JSON.stringify({
                id       : request.id,
                response : result
            }));
            socket.write("\nEND");
        }

        function lock(request) {
            var key       = request.argument1;
            var namespace = String(request.namespace);
            socket.write(JSON.stringify({
                id       : request.id,
                response : null
            }));
            socket.write("\nEND");
        }

        function unlock(request) {
            var key       = request.argument1;
            var namespace = String(request.namespace);
            socket.write(JSON.stringify({
                id       : request.id,
                response : null
            }));
            socket.write("\nEND");
        }

        socket.on("error", function (error) {
            // todo: log error
            //console.log("error", error);
        });

        socket.on("end", function () {
            // todo: save info to log
            //console.log("client disconnected");
        });

        socket.on("data", function (buffer) {

            var request,
                command,
                result;

            data = Buffer.concat([data, buffer]);

            if (data.slice(-4).toString("utf8") !== "\nEND") {
                return;
            }

            request = JSON.parse(data.slice(0, -4).toString("utf8")); // todo: error place
            command = request.command;
            result  = null;
            data    = new Buffer(0);

            switch (command) {
                case "getLength":
                    getLength();
                    break;
                case "getKey":
                    getKey(request);
                    break;
                case "getKeys":
                    getKeys(request);
                    break;
                case "getItem":
                    getItem(request);
                    break;
                case "getItems":
                    getItems(request);
                    break;
                case "hasItem":
                    hasItem(request);
                    break;
                case "hasItems":
                    hasItems(request);
                    break;
                case "setItem":
                    setItem(request);
                    break;
                case "setItems":
                    setItems(request);
                    break;
                case "removeItem":
                    removeItem(request);
                    break;
                case "removeItems":
                    removeItems(request);
                    break;
                case "lock":
                    lock(request);
                    break;
                case "unlock":
                    unlock(request);
                    break;
                default:
                    socket.write(JSON.stringify({
                        id       : request.id,
                        error    : "Command not found!",
                        response : null
                    }));
                    socket.write("\nEND");
                    break;
            }
        });
    });

server.listen(process.argv[2], function () {
    // todo: save info to log
    //console.log("server start");
});