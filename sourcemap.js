var fs = require("fs");
var sourceMap = require('source-map');
var deferred = require("./lib/deferred");

function regenerateSourceMaps(filename, linesShift, callback) {
    var smc;
    var content;
    console.log("deferred", deferred);
    deferred([
        function (next) {
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