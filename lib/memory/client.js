/*jslint */
/*global module, require */

var net      = require("net");
var path     = require('path');
var spawn    = require('child_process').spawn;
var deferred = require("../deferred");

function client(options) {

    var socket = options.socket;
    var client;

    /*client.on("data", function (buffer) {
        console.log(buffer.toString("utf8"));
    });*/

    return {
        connect: function (callback) {
            function complete(error) {
                if (typeof callback === "function") {
                    callback(error);
                }
            }
            var instance = net.createConnection(socket, function () {
                client = instance;
                complete(null);
            });
            instance.on("error", function (error) {
                complete(error);
            });
        },
        say: function (message, callback) {

        }
    };


}

module.exports = client;

var ins = client("../memory.socket");
ins.connect(function (error) {
    console.log("error", error);
});


function loop() {
    setTimeout(loop, 1000).ref();
}
loop();


