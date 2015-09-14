/// <reference path="../../types/node/node.d.ts" />
/// <reference path="../../types/optimist/optimist.d.ts" />
/// <reference path="../../types/log4js/log4js.d.ts" />

import optimist    = require("optimist");
import IDaemon     = require("./daemon/IDaemon");
import Daemon      = require("./daemon/Daemon");
import log4js      = require("log4js");
import WrapperException = require("../WrapperException");
import IMemory = require("../memory/client/IClient");
import Memory = require("../memory/client/Client");
import deferred = require("../deferred");

require("../mapping");
require("../../logger");

var logger:log4js.Logger = log4js.getLogger("worker"),
    argv:any = require("optimist").
        usage("Usage: daemon -l [worker] -m [memory]\nLess daemon").
        demand("l").alias("l", "location").describe("l", "Less worker unix socket path").
        demand("m").alias("m", "memory").describe("m", "Memory worker unix socket path").
        argv,
    handler:(errors:Error[]) => void = (errors:Error[]):void => {
        if (errors && errors.length) {
            process.stderr.write(JSON.stringify({
                started: false,
                errors: errors.map((error:Error):any => {
                    return WrapperException.convertToObject(error)
                })
            }) + "\n");
            logger.fatal("Something went wrong", errors); // todo: list errors
        } else {
            process.stderr.write(JSON.stringify({
                started: true
            }) + "\n");
            logger.info("Memory daemon started");
        }
    },
    memory:IMemory,
    daemon:IDaemon;

process.title = "Less daemon";

deferred([
    (next:() => void):void => {
        memory = new Memory({
            location: argv.memory,
            namespace: "less"
        });
        memory.connect((errors:Error[]):void => {
            if (!errors || !errors.length) {
                next();
            } else {
                handler(errors);
            }
        });
    },
    ():void => {
        daemon = new Daemon({
            location: argv.location,
            memory: memory
        });
        daemon.start((errors:Error[]):void => {
            handler(errors);
        });
    }
]);
