/// <reference path="../daemon/IDaemon.ts" />
/// <reference path="../daemon/Daemon.ts" />
/// <reference path="../../types/" />
/// <reference path="../optimist.d.ts" />
/// <reference path="../log4js.d.ts" />

import IDaemon = require("./daemon/IDaemon");
import Daemon = require("./daemon/Daemon");
import optimist = require("optimist");
import log4js = require("log4js");
var logger:log4js.Logger = log4js.getLogger("daemon");

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
    logger.info("Memory daemon started.");
});
