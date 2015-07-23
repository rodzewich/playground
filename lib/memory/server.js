var net = require('net');
var path = require('path');

var memory = {};
var locks = {};

var server = net.createServer(function (socket) {
    console.log('client connected');
    var data = new Buffer(0);
    socket.on("error", function (error) {
        console.log("error", error);
    });
    socket.on('end', function() {
        console.log('client disconnected');
    });

    socket.on("drain", function () {
        console.log("drain", arguments);
    });

    socket.on("data", function (buffer) {

        var request,
            command,
            argument1,
            argument2,
            result,
            arg1,
            arg2;

        if (buffer.length !== 3 || buffer.toString("utf8") !== "END") {
            data = Buffer.concat([data, buffer]);
            return;
        }

        request   = JSON.parse(data.toString("utf8")); // todo: error place
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
                arg1 = Math.max(0, parseInt(String(argument1), 10) || 0);
                result = Object.keys(memory)[arg1] || null;
                break;
            case "getItem":
                arg1 = String(argument1);
                result = memory[arg1] || null;
                break;
            case "setItem":
                arg1 = String(argument1);
                arg2 = argument2 || null;
                memory[arg1] = arg2;
                break;
            case "removeItem":
                arg1 = String(argument1);
                delete memory[arg1];
                break;
        }
        socket.write(JSON.stringify({
            id: request.id,
            pid: request.pid,
            response: result || null
        }));
        socket.write("END");
    });
});

server.listen(path.join(__dirname, "memory.socket"), function () {
    console.log("server start");
});
