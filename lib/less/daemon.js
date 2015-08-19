/// <reference path="./daemon/IDaemon.ts" />
/// <reference path="./daemon/Daemon.ts" />
/// <reference path="../CommonError.ts" />
/// <reference path="../../types/node/node.d.ts" />
/// <reference path="../../types/optimist/optimist.d.ts" />
/// <reference path="../../types/log4js/log4js.d.ts" />
/// <reference path="../../logger" />
var Daemon = require("./daemon/Daemon");
var log4js = require("../../logger");
var CommonError = require("../CommonError");
var logger = log4js.getLogger("worker");
var argv = require('optimist').
    usage('Usage: daemon -l [filename]').
    demand('l').
    alias('l', 'location').
    describe('l', 'Unix socket location').
    argv, daemon = new Daemon({
    location: argv.location
});
daemon.start(function (error) {
    if (error) {
        process.stderr.write(JSON.stringify({
            started: false,
            error: CommonError
        }) + "\n");
        logger.fatal("Something went wrong", error);
    }
    else {
        process.stderr.write(JSON.stringify({
            started: true
        }) + "\n");
        logger.info("Less daemon started");
    }
});
