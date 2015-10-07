/// <reference path="../../types/node/node.d.ts" />
/// <reference path="../../types/optimist/optimist.d.ts" />
/// <reference path="../../types/log4js/log4js.d.ts" />

process.addListener('uncaughtException', function (error:Error) {
    process.stderr.write(JSON.stringify({
            started : false,
            errors  : [{
                name    : error.name,
                message : error.message,
                stack   : error.stack
            }]
        }) + "\n");
    logger.fatal(errors);
});

import optimist    = require("optimist");
import IDaemon     = require("./daemon/IDaemon");
import Daemon      = require("./daemon/Daemon");
import log4js      = require("log4js");
import Exception = require("../exception/Exception");
import WrapperException = require("../WrapperException");

require("../mapping");
require("../../logger");

var logger:log4js.Logger = log4js.getLogger("worker"),
    argv:any = require("optimist").
        usage("Usage: daemon -l [filename]\nMemory daemon").
        demand("l").
        alias("l", "location").
        describe("l", "Unix socket location").
        argv,
    daemon:IDaemon = new Daemon({
        location: argv.location
    });

process.title = "Memory daemon";

daemon.start((errors:Exception[]):void => {
    var index:number,
        length:number;
    if (errors && errors.length) {
        process.stderr.write(JSON.stringify({
                started : false,
                errors  : errors.map((error:Exception):any => {
                    return error.toObject();
                })
            }) + "\n");
        length = errors.length;
        for (index = 0; index < length; index++) {
            logger.fatal(errors[index].getStack());
        }
    } else {
        process.stderr.write(JSON.stringify({
                started : true
            }) + "\n");
        logger.info("Memory daemon started");
    }
});
