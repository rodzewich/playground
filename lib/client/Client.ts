/// <reference path="../../types/node/node.d.ts" />

import IClient = require("./IClient");
import IOptions = require("./IOptions");
import net = require("net");
import WrapperException = require("../WrapperException");
import Exception = require("../Exception");
import isDefined = require("../isDefined");
import MeLocationHelper = require("../helpers/MeLocationHelper");
import IMeLocationHelper = require("../helpers/IMeLocationHelper");

class Client implements IClient {

    private _meLocation:IMeLocationHelper = new MeLocationHelper();

    private _socket:net.Socket;

    private _started:boolean = false;

    private _increment:number = 0;

    private _callbacks:any = {};

    constructor(options:IOptions) {
        if (options && isDefined(options.location)) {
            this.getMeLocation().setLocation(options.location);
        }
    }

    public getMeLocation():IMeLocationHelper {
        return this._meLocation;
    }

    private generateIdentifier():number {
        return this._increment++;
    }

    private registerHandler(callback:(errors:Error[], response:any) => void):number {
        var id:number = null;
        if (typeof callback === "function") {
            id = this.generateIdentifier();
            this._callbacks[id] = callback;
        }
        return id;
    }

    private findHandlerById(id:number):(errors:Error[], response:any) => void {
        if (this._callbacks[id]) {
            return <(errors:Error[], response:any) => void>this._callbacks[id];
        }
        return null;
    }

    protected call(callback:(errors:Error[], response:any) => void, ...args:any[]):void {
        if (!this._socket) {
            throw new Exception("Client wasn't connect");
        }
        if (typeof callback !== "function") {
            throw new Exception("bla bla bla");
        }
        this._socket.write(JSON.stringify({
                id   : this.registerHandler(callback),
                args : args
            }) + "\n");
    }

    public connect(callback:(errors:Error[]) => void):void {
        var data:Buffer = new Buffer(0),
            handler:(error?:Error) => void = (error?:Error):void => {
                socket.removeListener("error", handler);
                if (error) {
                    this._socket = undefined;
                } else {
                    this._started = true;
                }
                callback(error ? [error] : null);
            },
            socket:net.Socket = net.createConnection(this.getMeLocation().getLocation(), ():void => {
                handler(null);
            });
        socket.addListener("error", handler);
        socket.addListener("data", (buffer:Buffer):void => {
            var result:any,
                index:number,
                response:string,
                options:any,
                callback:(errors:Error[], response?:any) => void,
                string:string,
                getOptions:() => any = ():any => {
                    try {
                        return JSON.parse(response) || {};
                    } catch (error) {
                        return {};
                    }
                },
                getErrors:() => Error[] = ():Error[] => {
                    var index:number,
                        length:number,
                        result:Error[] = [],
                        options:any  = getOptions(),
                        errors:any[] = <any[]>options.errors;
                    if (errors && errors.length) {
                        length = errors.length;
                        for (index = 0; index < length; index++) {
                            result.push(new WrapperException(errors[index]));
                        }
                    }
                    return result.length ? result : null;
                },
                getResult:() => any = ():any => {
                    var options:any = getOptions();
                    return options.result || null;
                },
                getCallback:() => ((errors:Error[], response:any) => void) = ():((errors:Error[], response:any) => void) => {
                    var options:any = getOptions(),
                        id:number   = <number>options.id;
                    return this.findHandlerById(id) || null;
                };

            data = Buffer.concat([data, buffer]);
            do {
                string = data.toString("utf8");
                index  = string.indexOf("\n");
                if (index !== -1) {
                    response = string.slice(0, index + 1);
                    callback = getCallback();
                    if (typeof callback === "function") {
                        callback(getErrors(), getResult());
                    }
                    data = data.slice((new Buffer(response, "utf8")).length + 1);
                }
            } while (index !== -1);

        });
        this._socket = socket;
    }

    public disconnect(callback:(errors:Error[]) => void):void {
        // todo: реализовать потом
        setTimeout((): void => {
            callback(null);
        }, 0);
    }

}

export = Client;
