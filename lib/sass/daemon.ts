/// <reference path="../../types/node/node.d.ts" />
/// <reference path="../../types/optimist/optimist.d.ts" />

var messageSent = false;
process.title = "Sass daemon";
process.addListener('uncaughtException', function (error:Error) {
    if (!messageSent) {
        process.stderr.write(JSON.stringify({
                started : false,
                errors  : [Exception.convertFromError(error).toObject()]
            }) + "\n");
        messageSent = true;
    }
    logger.fatal(error);
});

import optimist   = require("optimist");
import IDaemon    = require("./daemon/IDaemon");
import Daemon     = require("./daemon/Daemon");
import log4js     = require("../../logger");
import IMemory    = require("../memory/client/IClient");
import Memory     = require("../memory/client/Client");
import Exception  = require("../exception/Exception");
import IException = require("../exception/IException");
import deferred   = require("../deferred");

require("../mapping");
var memory:IMemory;
var daemon:IDaemon;
var logger:log4js.Logger = log4js.getLogger("sass");
var argv:any = optimist
    .usage("Usage: daemon -l [daemon] -m [memory]\nSass daemon")
    .demand("l").alias("l", "location").describe("l", "Daemon worker location")
    .demand("m").alias("m", "memory").describe("m", "Memory worker location")
    .argv;

function handler(errors:IException[]):void {
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
        logger.info("Sass daemon started");
    }
}

deferred([
    (next:() => void):void => {
        memory = new Memory({
            location  : argv.memory,
            namespace : "sass"
        });
        memory.connect((errors:IException[]):void => {
            if (!errors || !errors.length) {
                next();
            } else {
                handler(errors);
            }
        });
    },
    ():void => {
        daemon = new Daemon({
            location : argv.location,
            memory   : memory
        });
        daemon.start((errors:IException[]):void => {
            handler(errors);
        });
    }
]);
