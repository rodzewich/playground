/*jslint */
/*global module, require, Buffer */

// todo: 1. сделать так, чтобы команды ждали друг друга!
// todo: 2. дописать lock!

var net    = require('net'),
    path   = require('path'),
    memory = {},
    locks  = {},
    server = net.createServer(function (socket) {
        //console.log('client connected');
        var data = new Buffer(0);
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
                argument1,
                argument2,
                result,
                arg1,
                arg2;

            data = Buffer.concat([data, buffer]);

            if (data.slice(-4).toString("utf8") !== "\nEND") {
                return;
            }

            request = JSON.parse(data.slice(0, -4).toString("utf8")); // todo: error place
            command   = request.command;
            argument1 = request.argument1;
            argument2 = request.argument2;
            result    = null;
            data      = new Buffer(0);

            switch (command) {
                case "length":
                    result = Object.keys(memory).length;
                    break;
                case "key":
                    arg1   = Math.max(0, parseInt(String(argument1), 10) || 0);
                    result = Object.keys(memory)[arg1] || null;
                    break;
                case "getItem":
                    arg1   = String(argument1);
                    result = memory[arg1] || null;
                    break;
                case "setItem":
                    arg1         = String(argument1);
                    arg2         = argument2 || null;
                    memory[arg1] = arg2;
                    break;
                case "removeItem":
                    arg1 = String(argument1);
                    delete memory[arg1];
                    break;
                case "lock":
                    break;
            }
            socket.write(JSON.stringify({
                id       : request.id,
                pid      : request.pid,
                response : result || null
            }));
            socket.write("\nEND");
        });
    });

server.listen(path.join(__dirname, "memory.socket"), function () {
    //console.log("server start");
});
