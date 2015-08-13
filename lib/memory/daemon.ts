/// <reference path="../daemon/IDaemon.ts" />
/// <reference path="./Daemon.ts" />

import IDaemon = require("../IDaemon");
import Daemon = require("./Daemon");

if (process.argv.length !== 3) {
    throw new Error("bla bla bla");
}

var daemon:IDaemon = new Daemon({
    location: process.argv[2]
});
daemon.start((error:Error):void => {
    // todo: log info
});
