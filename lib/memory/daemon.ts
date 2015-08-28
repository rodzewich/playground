/// <reference path="./daemon/IDaemon.ts" />
/// <reference path="./daemon/Daemon.ts" />
/// <reference path="../WrapperException.ts" />
/// <reference path="../../types/node/node.d.ts" />
/// <reference path="../../types/optimist/optimist.d.ts" />
/// <reference path="../../types/log4js/log4js.d.ts" />
/// <reference path="../../logger" />

import optimist    = require("optimist");
import IDaemon     = require("./daemon/IDaemon");
import Daemon      = require("./daemon/Daemon");
import log4js      = require("../../logger");
import WrapperException = require("../WrapperException");

require("../mapping");

var logger:log4js.Logger = log4js.getLogger("worker"),
    argv:any = require('optimist').
        usage('Usage: daemon -l [filename]').
        demand('l').
        alias('l', 'location').
        describe('l', 'Unix socket location').
        argv,
    daemon:IDaemon = new Daemon({
        location: argv.location
    });

daemon.start((errors:Error[]):void => {
    if (errors && errors.length) {
        process.stderr.write(JSON.stringify({
            started: false,
            errors: errors.map((error:Error):any => {
                return WrapperException.convertToObject(error)
            })
        }) + "\n");
        logger.fatal("Something went wrong", errors);
    } else {
        process.stderr.write(JSON.stringify({
            started: true
        }) + "\n");
        logger.info("Memory daemon started");
    }
});
