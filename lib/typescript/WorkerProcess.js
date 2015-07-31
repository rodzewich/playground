var net = require('net');
var path = require('path');
var compiler = require("./compiler");
var typeOf = require("../typeOf");

var server = net.createServer(function (socket) {
    console.log('client connected');

    var data = new Buffer(0);

    socket.on('end', function() {
        console.log('client disconnected');
    });

    function onData(buffer) {
        var index;
        var request;
        var string;
        data = Buffer.concat([data, buffer]);

        function doCompile(data) {
            var request = JSON.parse(data);
            var id = request.id;
            var options = request.options;
            compiler(options, function (errors, result) {
                console.log("compiler", arguments);
                socket.write(JSON.stringify({
                    id     : id,
                    errors : errors && errors.length ? errors.map(function (error) {
                        // todo: передавать остальные свойства
                        return {
                            name: error.name,
                            message: error.message
                        }
                    }) : null,
                    result : result || null
                }));
                socket.write("\n");
            });
        }

        do {
            string = data.toString("utf8");
            index = string.indexOf("\n");
            if (index !== -1) {
                request = string.slice(0, index + 1);
                data = data.slice((new Buffer(request, "utf8")).length + 1);
                doCompile(request);
            }
        } while (index !== -1)

    }


    socket.on('data', onData);

    socket.on("error", function (error) {
        console.log("error", error);
    });
});

if (process.argv.length !== 3) {
    throw new Error("bla bla bla");
}

server.listen(path.join(process.argv[2], './worker-' + String(process.pid) + ".sock"), function () {
    console.log("server start!");
});

/*
server.close(function () {

});*/

// https://nodejs.org/api/child_process.html
// child.pid
// child.kill([signal])