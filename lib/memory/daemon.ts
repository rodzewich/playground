/// <reference path="../../types/node/node.d.ts" />
/// <reference path="../../types/optimist/optimist.d.ts" />

var messageSent:boolean = false,
    logger:log4js.Logger,
    daemon:IDaemon,
    argv:any;

process.title = "Memory daemon";
process.addListener('uncaughtException', function (error:Error) {
    if (!messageSent) {
        process.stderr.write(JSON.stringify({
                started : false,
                errors  : [Exception.convertFromError(error).toObject()]
            }) + "\n");
        messageSent = true;
    }
    if (logger) {
        logger.fatal(error);
    }
});

import Exception  = require("../exception/Exception");
import IException = require("../exception/IException");
import IDaemon    = require("./daemon/IDaemon");
import Daemon     = require("./daemon/Daemon");
import log4js     = require("../../logger");
import optimist   = require("optimist");

require("../mapping");

logger = log4js.getLogger("memory");
argv = optimist.usage("Usage: memory [location]").argv;

if (!argv._ || !argv._.length) {
    optimist.showHelp();
    process.exit();
}

daemon = new Daemon({
    location : <string>argv._.shift()
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
