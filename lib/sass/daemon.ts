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
    if (logger) {
        logger.fatal(error);
    }
});

import Exception  = require("../exception/Exception");
import IException = require("../exception/IException");
import IMemory    = require("../memory/client/IClient");
import Memory     = require("../memory/client/Client");
import IDaemon    = require("./daemon/IDaemon");
import Daemon     = require("./daemon/Daemon");
import deferred   = require("../deferred");
import log4js     = require("../../logger");
import optimist   = require("optimist");

require("../mapping");
var memory:IMemory;
var daemon:IDaemon;
var logger:log4js.Logger = log4js.getLogger("sass");
var argv:any = optimist
    .usage("Usage: sass -l [daemon] -m [memory]")
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
