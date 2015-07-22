var net = require('net');
var spawn = require('child_process').spawn;
var path = require('path');

function client() {

    var client = new net.Socket({});
    var children = spawn(process.execPath, [
        path.join(__dirname, "server.js")

    ], {
        //cwd: "sdfsdfs"
    });
    var socket = "./worker-" + String(children.pid) + ".sock";

    return;

    client.on("data", function (buffer) {
        console.log(buffer.toString("utf8"));
    });

    return {
        connect: function (callback) {
            path.join(__dirname, "server");
            client.connect(socket, function () {
                callback();
            });
        },
        say: function (message, callback) {

        }
    };

}


module.exports = client;

client();

return;

var client = new net.Socket({});

client.on("error", function (error) {
    console.log("error", error);
});

client.connect("./worker-13021.sock", function () {
    var data = [];

});

client.setEncoding("utf8");

client.on("data", function (buffer) {
    console.log(buffer.toString("utf8"));
    //data.push(buffer.toString("utf8"));
});

client.on("end", function () {
    console.log("data", data.join(""));
});

function func() {
    setTimeout(function () {
        client.write("sdfsfds", "utf8", function () {
            console.log(arguments);
            func();
        });
    }, 3000).ref();
}

func();
