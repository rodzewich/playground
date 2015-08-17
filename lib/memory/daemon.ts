/// <reference path="./daemon/IDaemon.ts" />
/// <reference path="./daemon/Daemon.ts" />
/// <reference path="../CommonError.ts" />
/// <reference path="../../types/node/node.d.ts" />
/// <reference path="../../types/optimist/optimist.d.ts" />
/// <reference path="../../types/log4js/log4js.d.ts" />
/// <reference path="../../logger" />

import optimist    = require("optimist");
import IDaemon     = require("./daemon/IDaemon");
import Daemon      = require("./daemon/Daemon");
import log4js      = require("../../logger");
import CommonError = require("../CommonError");
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
            started: false,
                error: CommonError
        })+ "\n");
        logger.fatal("Something went wrong", error);
    } else {
        process.stderr.write(JSON.stringify({
            started: true
        })+ "\n");
        logger.info("Memory daemon started");
    }
});
