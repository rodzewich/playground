var net = require('net');
var path = require('path');

var server = net.createServer(function (socket) {
    console.log('client connected');
    socket.on('end', function() {
        console.log('client disconnected');
    });
    socket.write('Echo server\r\n');
    socket.pipe(socket);
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