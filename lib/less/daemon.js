/// <reference path="./daemon/IDaemon.ts" />
/// <reference path="./daemon/Daemon.ts" />
/// <reference path="../WrapperException.ts" />
/// <reference path="../memory/client/IClient" />
/// <reference path="../memory/client/Client" />
/// <reference path="../../types/node/node.d.ts" />
/// <reference path="../../types/optimist/optimist.d.ts" />
/// <reference path="../../types/log4js/log4js.d.ts" />
/// <reference path="../../logger" />
var Daemon = require("./daemon/Daemon");
var log4js = require("../../logger");
var WrapperException = require("../WrapperException");
var Memory = require("../memory/client/Client");
var deferred = require("../deferred");
var logger = log4js.getLogger("worker"), argv = require("optimist").
    usage("Usage: daemon -l [worker] -m [memory]\nLess compilation daemon").
    demand("l").alias("l", "location").describe("l", "Less worker unix socket path").
    demand("m").alias("m", "memory").describe("m", "Memory worker unix socket path").
    argv, handler = function (errors) {
    if (errors && errors.length) {
        process.stderr.write(JSON.stringify({
            started: false,
            errors: errors.map(function (error) {
                return WrapperException.convertToObject(error);
            })
        }) + "\n");
        logger.fatal("Something went wrong", errors);
    }
    else {
        process.stderr.write(JSON.stringify({
            started: true
        }) + "\n");
        logger.info("Memory daemon started");
    }
}, memory, daemon;
deferred([
    function (next) {
        memory = new Memory({
            location: argv.memory,
            namespace: "less"
        });
        memory.connect(function (errors) {
            if (!errors || !errors.length) {
                next();
            }
            else {
                handler(errors);
            }
        });
    },
    function () {
        daemon = new Daemon({
            location: argv.location,
            memory: memory
        });
        daemon.start(function (errors) {
            handler(errors);
        });
    }
]);
//# sourceMappingURL=daemon.js.map