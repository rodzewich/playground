/// <reference path="../../types/node/node.d.ts" />
/// <reference path="../../types/optimist/optimist.d.ts" />

var messageSent = false;
process.title = "Memory daemon";
process.addListener('uncaughtException', function (error:Error) {
    if (!messageSent) {
        process.stderr.write(JSON.stringify({
                started : false,
                errors  : [{
                    name    : error.name,
                    message : error.message,
                    stack   : error.stack
                }]
            }) + "\n");
        messageSent = true;
    }
    logger.fatal(error);
});

import optimist   = require("optimist");
import IDaemon    = require("./daemon/IDaemon");
import Daemon     = require("./daemon/Daemon");
import log4js     = require("../../logger");
import Exception  = require("../exception/Exception");
import IException = require("../exception/IException");

require("../mapping");
var logger:log4js.Logger = log4js.getLogger("memory");
var argv:any = optimist
    .usage("Usage: daemon -l [filename]\nMemory daemon")
    .demand("l")
    .alias("l", "location")
    .describe("l", "Unix socket location")
    .argv;
var daemon:IDaemon = new Daemon({
    location : argv.location
});

daemon.start((errors:IException[]):void => {
    var index:number,
        length:number;
    if (errors && errors.length) {
        if (!messageSent) {
            process.stderr.write(JSON.stringify({
                    started : false,
                    errors  : errors.map((error:IException):any => {
                        return error.toObject();
                    })
                }) + "\n");
            messageSent = true;
        }
        length = errors.length;
        for (index = 0; index < length; index++) {
            logger.fatal(errors[index].getStack());
        }
    } else {
        if (!messageSent) {
            process.stderr.write(JSON.stringify({
                    started : true
                }) + "\n");
            messageSent = true;
        }
        logger.info("Memory daemon started");
    }
});
