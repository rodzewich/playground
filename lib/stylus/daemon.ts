/// <reference path="../../types/node/node.d.ts" />
/// <reference path="../../types/optimist/optimist.d.ts" />

var messageSent = false;
process.title = "Stylus daemon";
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

import {Exception, IException} from "../exception";
import IMemory    = require("../memory/client/IClient");
import Memory     = require("../memory/client/Client");
import IDaemon    = require("./daemon/IDaemon");
import Daemon     = require("./daemon/Daemon");
import {deferred} from "../utils";
import log4js     = require("../../logger");
import optimist   = require("optimist");

require("../mapping");
var memory:IMemory;
var daemon:IDaemon;
var logger:log4js.Logger = log4js.getLogger("stylus");
var argv:any = optimist
    .usage("Usage: stylus -l [daemon] -m [memory]")
    .demand("l").alias("l", "location").describe("l", "Daemon socket location")
    .demand("m").alias("m", "memory").describe("m", "Memory socket location")
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
        logger.info("Stylus daemon started");
    }
}

deferred([
    (next:() => void):void => {
        memory = new Memory({
            location  : argv.memory,
            namespace : "stylus"
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
