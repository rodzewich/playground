/// <reference path="../../client/Client.ts" />
/// <reference path="./IClient.ts" />
/// <reference path="./IOptions.ts" />
/// <reference path="../../../types/node/node.d.ts" />

import AbstractClient = require("../../client/Client");
import IOptions = require("./IOptions");
import IClient = require("./IClient");
import cp = require("child_process");

class Client extends AbstractClient implements IClient {

    constructor(options:IOptions) {
        super(options);
    }

    protected getDaemonLocation(): string {
        return null;
    }

    public compile(filename:string, callback:(errors?:Error[], result?:any) => void):void {
        setTimeout(():void => {
            if (typeof callback === "function") {
                callback(null, null);
            }
        }, 0);
    }

    public connect(callback:(errors?:Error[]) => void): void {
        var location:string = this.getLocation();


        var command:cp.ChildProcess = cp.spawn(process.execPath, [this.getDaemonLocation(), "--location", this.getLocation()]),
            response: Buffer = new Buffer(0),
            echo:(stream:NodeJS.WritableStream, data:Buffer) => void = (stream:NodeJS.WritableStream, data:Buffer):void => {
                stream.write(data);
            },
            handler:(data:Buffer) => void = (data:Buffer):void => {
                var result:any,
                    error:Error,
                    string: string,
                    index: number,
                    json: string;
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
                        logger.warn("Worker send error content", response.toString("utf8"));
                        process.stderr.write(response);
                        result = {started: false, error: err};
                    }
                    response = response.slice((new Buffer(json, "utf8")).length + 1);
                    if (!result.started) {
                        error = new CommonError(result.error);
                        logger.fatal("Something went wrong", error);
                        callback(error);
                    } else {
                        logger.info("Less daemon started");
                        callback(null);
                    }
                }
            };
        command.stderr.addListener("data", handler);
        command.stdout.addListener("data", handler);

    }

    public disconnect(callback:(errors?:Error[]) => void): void {

    }


}

export = Client;

