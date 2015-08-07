var net = require('net');
var path = require('path');
var Compiler = require("./Compiler");
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
            var instance = new Compiler({
                sourcesDirectory     : options.sourcesDirectory,
                importDirectories    : options.importDirectories,
                memorySocketLocation : options.memorySocketLocation,
                useCache             : options.useCache
            });
            instance.compile(options.filename, function (result) {
                console.log("compiler", arguments);
                socket.write(JSON.stringify({
                    id     : id,
                    // @deprecated
                    errors : null/*errors && errors.length ? errors.map(function (error) {
                        // todo: передавать остальные свойства
                        return {
                            name    : error.name,
                            message : error.message
                        }
                    }) : null*/,
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

server.listen(path.join(process.argv[2], './less-' + String(process.pid) + ".sock"), function () {
    console.log("server start!");
});
