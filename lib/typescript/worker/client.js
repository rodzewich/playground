var net = require('net');

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
