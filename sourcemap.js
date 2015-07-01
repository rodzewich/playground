var fs = require("fs");
var sourceMap = require('source-map');
var deferred = require("./lib/deferred");

var http = require('http');
http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Hello World\n');
}).listen(1337, '127.0.0.1');

function regenerateSourceMaps(filename, linesShift, callback) {
    var smc;
    var content;
    deferred([
        function (next) {
            console.log(123);
            fs.readFile(filename, function (error, buffer) {
                if (!error) {
                    content = buffer.toString("utf8");
                    next();
                } else {
                    console.log(error);
                }
            });
        },
        function (next) {
            console.log(content);
            smc = new sourceMap.SourceMapConsumer(content);
            console.log("smc", smc);
        },
        function () {
            smc.eachMapping(function (m) {
                // ...
            });
        }
    ]);
}

regenerateSourceMaps("index.js.map");