var net = require('net');

console.log("process.argv", process.argv);

var server = net.createServer(function (socket) {
    console.log('client connected');
    socket.on('end', function() {
        console.log('client disconnected');
    });
    socket.write('Echo server\r\n');
    socket.pipe(socket);
});

server.listen('./worker-' + String(process.pid) + ".sock", function () {
    console.log("server start!");
});

/*
server.close(function () {

});*/

// https://nodejs.org/api/child_process.html
// child.pid
// child.kill([signal])