/*jslint */
/*global module, require, Buffer */

// todo: 2. дописать lock!
// todo: 3. принимать путь к сокету из аргументов!
// todo: 4. дописать setItems, getItems, removeItems, hasItem, hasItems

var net    = require('net'),
    path   = require('path'),
    memory = {},
    length = 0,
    locks  = {},
    server = net.createServer(function (socket) {
        //console.log('client connected');
        var data = new Buffer(0);

        function getItem(request) {
            var key = String(request.argument1);
            socket.write(JSON.stringify({
                id       : request.id,
                response : memory[key] || null
            }));
            socket.write("\nEND");
        }

        function getItems(request) {
        }

        function setItem(request) {
            var key = String(request.argument1),
                value = request.argument2 || null;
            memory[key] = value;
            length = Object.keys(memory).length;
            socket.write(JSON.stringify({
                id       : request.id,
                response : null
            }));
            socket.write("\nEND");
        }

        function setItems(request) {
        }

        function hasItem(request) {
        }

        function hasItems(request) {
        }

        function removeItem(request) {
            var key = String(request.argument1);
            delete memory[key];
            length = Object.keys(memory).length;
        }

        function removeItems(request) {
        }

        function getLength(request) {
            socket.write(JSON.stringify({
                id       : request.id,
                response : length
            }));
            socket.write("\nEND");
        }

        function getKey(request) {
            var argument = request.argument1,
                index   = Math.max(0, parseInt(String(argument), 10) || 0);
            return Object.keys(memory)[index] || null;
        }

        function getKeys(request) {
        }

        function lock(request) {
        }

        function unlock(request) {
        }

        socket.on("error", function (error) {
            // todo: log error
            //console.log("error", error);
        });
        socket.on('end', function () {
            //console.log('client disconnected');
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

server.listen(path.join(__dirname, "memory.socket"), function () {
    //console.log("server start");
});
