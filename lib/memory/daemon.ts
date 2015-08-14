/// <reference path="../daemon/IDaemon.ts" />
/// <reference path="../daemon/Daemon.ts" />
/// <reference path="../node.d.ts" />
/// <reference path="../optimist.d.ts" />

import IDaemon = require("./daemon/IDaemon");
import Daemon = require("./daemon/Daemon");
import optimist = require("optimist");

var argv:any = require('optimist').
        usage('Usage: daemon -l [filename]').
        demand('l').
        alias('l', 'location').
        describe('l', 'Unix socket location').
        argv,
    daemon:IDaemon = new Daemon({
        location: argv.location
    });

daemon.start((error:Error):void => {
    // todo: log info
});
