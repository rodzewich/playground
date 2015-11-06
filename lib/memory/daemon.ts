/// <reference path="../../types/node/node.d.ts" />
/// <reference path="../../types/optimist/optimist.d.ts" />

var messageSent:boolean = false,
    logger:log4js.Logger,
    daemon:IDaemon,
    argv:any;

process.title = "Memory daemon";
process.addListener('uncaughtException', function (error:Error) {
    if (!messageSent) {
        if (argv.json) {
            process.stderr.write(JSON.stringify({
                    started : false,
                    errors  : [Exception.convertFromError(error).toObject()]
                }) + "\n");
        } else {
            displayException(Exception.convertFromError(error));
        }
        messageSent = true;
    }
    if (logger) {
        logger.fatal(error);
    }
});

import displayException = require("../displayException");
import isArray          = require("../isArray");
import Exception        = require("../exception/Exception");
import IException       = require("../exception/IException");
import IObject          = require("../exception/IObject");
import IDaemon          = require("./daemon/IDaemon");
import Daemon           = require("./daemon/Daemon");
import log4js           = require("../../logger");
import path             = require("path");
import optimist         = require("optimist");
import config           = require("../../config");

require("../mapping");

logger = log4js.getLogger("memory");
argv = optimist
    .usage("Usage: memory [options] [location]")
    .boolean("j").alias("j", "json").describe("j", "Response as json")
    .boolean("d").alias("d", "debug").describe("d", "Debug mod")
    .boolean("h").alias("h", "help").describe("h", "Show this help")
    .argv;

if (isArray(argv._) && (<Array>argv._).length === 0 || argv.help) {
    optimist.showHelp();
    process.exit();
}

daemon = new Daemon({
    location : getLocation(),
    debug    : isDebug()
});

daemon.start((errors:IException[]):void => {
    var index:number,
        length:number;
    if (errors && errors.length) {
        if (!messageSent) {
            if (argv && !!argv.json) {
                process.stderr.write(JSON.stringify({
                        started : false,
                        errors  : errors.map((error:IException):IObject => {
                            return error.toObject();
                        })
                    }) + "\n");
            } else {
                errors.forEach((error:IException):void => {
                    displayException(error);
                });
            }
            messageSent = true;
        }
        length = errors.length;
        for (index = 0; index < length; index++) {
            logger.fatal(errors[index].getStack());
        }
    } else {
        if (!messageSent) {
            if (argv && !!argv.json) {
                process.stderr.write(JSON.stringify({
                        started : true
                    }) + "\n");
                messageSent = true;
            } else {
                console.log("Memory daemon started");
            }
        }
        logger.info("Memory daemon started");
    }
});

function getLocation():string {
    var location:string = argv._.shift();
    if (!path.isAbsolute(location)) {
        location = path.join(process.cwd(), location);
    }
    return path.normalize(location);
}

function isDebug():boolean {
    return config.DEBUG && !!argv.debug;
}
