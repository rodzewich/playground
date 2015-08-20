/// <reference path="../../client/Client.ts" />
/// <reference path="./IClient.ts" />
/// <reference path="./IOptions.ts" />
/// <reference path="../../../types/node/node.d.ts" />
/// <reference path="../../deferred.ts" />
/// <reference path="../../../types/log4js/log4js.d.ts" />
/// <reference path="../../../logger" />

import typeOf = require("../../typeOf");
import deferred = require("../../deferred");
import CommonError = require("../../CommonError");
import AbstractClient = require("../../client/Client");
import IOptions = require("./IOptions");
import IClient = require("./IClient");
import cp = require("child_process");
import log4js      = require("../../../logger");
var logger:log4js.Logger = log4js.getLogger("worker");

class Client extends AbstractClient implements IClient {

    constructor(options:IOptions) {
        super(options);
    }

    protected getDaemon(): string {
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
        deferred([
            (next:() => void):void => {
                var command:cp.ChildProcess = cp.spawn(process.execPath, [this.getDaemon(), "--location", this.getLocation()]),
                    data:Buffer = new Buffer(0),
                    echo:(stream:NodeJS.WritableStream, data:Buffer) => void =
                        (stream:NodeJS.WritableStream, data:Buffer):void => {
                            stream.write(data);
                        },
                    handler:(buffer:Buffer) => void = (buffer:Buffer):void => {
                        var result:any,
                            errors:Error[] = [],
                            string:string,
                            index:number,
                            json:string;
                        data   = Buffer.concat([data, buffer]);
                        string = buffer.toString("utf8");
                        index  = string.indexOf("\n");
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
                                result = JSON.parse(json) || {started: false, errors: [{message: "Unknown error"}]};
                            } catch (err) {
                                logger.warn("Worker send error content", data.toString("utf8"));
                                process.stderr.write(data);
                                result = {started: false, errors: [CommonError.convertToObject(err)]};
                            }
                            data = data.slice((new Buffer(json, "utf8")).length + 1);
                            if (!result.started) {
                                if (typeOf(result.errors) === "array") {
                                    errors = (<any[]>result.errors).map((item:any):Error => {
                                        return new CommonError(item);
                                    });
                                }
                                logger.fatal("Something went wrong", errors); // todo: по другому выводить ошибки
                                callback(errors);
                            } else {
                                logger.info("Less daemon started");
                                next();
                            }
                        }
                    };
                command.stderr.addListener("data", handler);
                command.stdout.addListener("data", handler);
            },
            (next:() => void):void => {
                super.connect(callback);
            }
        ]);

    }

    public disconnect(callback:(errors?:Error[]) => void): void {

    }


}

export = Client;

