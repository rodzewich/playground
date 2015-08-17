/// <reference path="../daemon/IDaemon.ts" />
/// <reference path="../daemon/Daemon.ts" />
/// <reference path="../../types/node/node.d.ts" />
/// <reference path="../../types/optimist/optimist.d.ts" />
/// <reference path="../../types/log4js/log4js.d.ts" />
/// <reference path="../../logger" />

import IDaemon = require("./daemon/IDaemon");
import Daemon = require("./daemon/Daemon");
import optimist = require("optimist");
import log4js = require("../../logger");
var logger:log4js.Logger = log4js.getLogger("worker");

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
    if (error) {
        process.stderr.write(JSON.stringify({
            started: false
        }));
        logger.fatal("Something went wrong", error);
    } else {
        process.stderr.write(JSON.stringify({
            started: true
        }));
        logger.info("Memory daemon started");
    }
});
