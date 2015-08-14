/// <reference path="../daemon/IDaemon.ts" />
/// <reference path="../daemon/Daemon.ts" />
/// <reference path="../node.d.ts" />

import IDaemon = require("./daemon/IDaemon");
import Daemon = require("./daemon/Daemon");

if (process.argv.length !== 3) {
    throw new Error("bla bla bla");
}

var daemon:IDaemon = new Daemon({
    location: process.argv[2]
});

// todo: using optimist module

daemon.start((error:Error):void => {
    // todo: log info
});
