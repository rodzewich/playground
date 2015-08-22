/// <reference path="./daemon/IDaemon.ts" />
/// <reference path="./daemon/Daemon.ts" />
/// <reference path="../CommonError.ts" />
/// <reference path="../memory/client/IClient" />
/// <reference path="../memory/client/Client" />
/// <reference path="../../types/node/node.d.ts" />
/// <reference path="../../types/optimist/optimist.d.ts" />
/// <reference path="../../types/log4js/log4js.d.ts" />
/// <reference path="../../logger" />

import optimist    = require("optimist");
import IDaemon     = require("./daemon/IDaemon");
import Daemon      = require("./daemon/Daemon");
import log4js      = require("../../logger");
import CommonError = require("../CommonError");
import IMemory = require("../memory/client/IClient");
import Memory = require("../memory/client/Client");

var logger:log4js.Logger = log4js.getLogger("worker"),
    argv:any = require("optimist").
        usage("Usage: daemon -l [worker] -m [memory]\nLess compilation daemon").
        demand("l").alias("l", "location").describe("l", "Less worker unix socket path").
        demand("m").alias("m", "memory").describe("m", "Memory worker unix socket path").
        argv,
    memory:IMemory = new Memory({
        location: argv.memory,
        namespace: "less"
    }),
    daemon:IDaemon = new Daemon({
        location: argv.location,
        memory: memory
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
        logger.info("Less daemon started");
    }
});
