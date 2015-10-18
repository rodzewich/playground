/// <reference path="../../types/node/node.d.ts" />
/// <reference path="../../types/log4js/log4js.d.ts" />

import cp                = require("child_process");
import path              = require("path");
import log4js            = require("log4js");
import WrapperException  = require("../WrapperException");
var logger:log4js.Logger = log4js.getLogger("client");

function init(location:string, callback:(error?:Error) => void):void {
    var daemon:string = path.join(__dirname, "daemon.js"),
        command:cp.ChildProcess = cp.spawn(process.execPath, [daemon, "--location", location]),
        response:Buffer = new Buffer(0),
        echo:(stream:NodeJS.WritableStream, data:Buffer) => void = (stream:NodeJS.WritableStream, data:Buffer):void => {
            stream.write(data);
        },
        handler:(data:Buffer) => void = (data:Buffer):void => {
            var result:any,
                error:Error,
                string:string,
                index:number,
                json:string;
            response = Buffer.concat([response, data]);
            string = data.toString("utf8");
            index = string.indexOf("\n");
            if (index !== -1) {
                command.stderr.removeListener("data", handler);
                command.stdout.removeListener("data", handler);
                command.stderr.addListener("data", (data:Buffer):void => {
                    echo(process.stderr, data);
                });
                command.stdout.addListener("data", (data:Buffer):void => {
                    echo(process.stdout, data);
                });
                json = string.slice(0, index + 1);
                try {
                    result = JSON.parse(json) || {started: false, error: {message: "Unknown error"}};
                } catch (err) {
                    logger.warn("worker sent error content", response.toString("utf8"));
                    process.stderr.write(response);
                    result = {started: false, error: err};
                }
                response = response.slice((new Buffer(json, "utf8")).length + 1);
                if (!result.started) {
                    error = new WrapperException(result.error);
                    logger.fatal("Something went wrong", error);
                    callback(error);
                } else {
                    logger.info("Memory daemon started");
                    callback(null);
                }
            }
        };
    command.stderr.addListener("data", handler);
    command.stdout.addListener("data", handler);
}

export = init;
