/// <reference path="../../types/node/node.d.ts" />
/// <reference path="../../types/log4js/log4js.d.ts" />

import cp     = require("child_process");
import path   = require("path");
import log4js = require("log4js");
var logger:log4js.Logger = log4js.getLogger("client");

function init(location:string, callback:(error?:Error) => void):void {
    var daemon:string = path.join(__dirname, "daemon.js"),
        command:cp.ChildProcess = cp.spawn(process.execPath, [daemon, "--location", location]),
        handler:(data:Buffer) => void = (data:Buffer):void => {
            console.log(data.toString("utf8"));
            var result:any,
                error:Error;
            try {
                result = JSON.parse(data.toString("utf8")) || {started: false};
            } catch (err) {
                result = {started: false};
            }
            if (!result.started) {
                error = new Error("bla bla bla"); // todo: use error from stdout
                logger.fatal("Something went wrong", error);
                callback(error);
            } else {
                logger.info("Memory daemon started");
                callback(null);
            }
        };
    command.stderr.addListener("data", handler);
    command.stdout.addListener("data", handler);
}

export = init;
