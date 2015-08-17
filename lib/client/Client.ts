/// <reference path="./IClient.ts" />
/// <reference path="./IOptions.ts" />
/// <reference path="../../types/node/node.d.ts" />

import IClient = require("./IClient");
import IOptions = require("./IOptions");
import net = require("net");

class Client implements IClient {

    private _location:string;

    private _socket:net.Socket;

    private _started:boolean;

    private _increment: number = 0;

    private _callbacks: any = {};

    constructor(options:IOptions) {
        this.setLocation(options.location);
    }

    protected setLocation(value:string):void {
        this._location = value;
    }

    protected getLocation():string {
        return this._location;
    }

    protected generateIdentifier(): number {
        return this._increment++;
    }

    protected registerHandler(callback:(error?:Error, response?:any) => void): number {
        var id: number = null;
        if (typeof callback === "function") {
            id = this.generateIdentifier();
            this._callbacks[id] = callback;
        }
        return id;
    }

    protected findHadlerById(id: number):(error?:Error, response?:any) => void {
        if (this._callbacks[id]) {
            return this._callbacks[id];
        }
        return null;
    }

    protected call(callback:(error?:Error, response?:any) => void, ...args:any[]):void {
        if (!this._socket) {
            throw new Error("bla bla bla");
        }
        if (typeof callback !== "function") {
            throw new Error("bla bla bla");
        }
        this._socket.write(JSON.stringify({
            id: this.registerHandler(callback),
            args: args
        }) + "\n");
    }

    public connect(callback:(error?:Error) => void):void {
        var data:Buffer = new Buffer(0),
            handler:(error?:Error) => void = (error?:Error):void => {
                socket.removeListener("error", handler);
                if (error) {
                    this._socket = undefined;
                } else {
                    this._started = true;
                }
                callback(error || null);
            },
            socket:net.Socket = net.createConnection(this.getLocation(), ():void => {
                handler(null);
            });
        socket.addListener("error", handler);
        socket.addListener("data", (buffer:Buffer):void => {
            var result:any,
                index:number,
                response:string,
                options:any,
                callback:(error?:Error, response?:any) => void,
                string:string,
                getOptions:() => any = ():any => {
                    try {
                        return JSON.parse(response) || {};
                    } catch (error) {
                        return {};
                    }
                },
                getError:() => Error = ():Error => {
                    var options:any = getOptions(),
                        error:any = options.error;
                    if (error) {
                        return new Error(error.message); // todo: писать правильную ошибку
                    }
                    return null;
                },
                getResult:() => any = ():any => {
                    var options:any = getOptions();
                    return options.result || null;
                },
                getCallback:() => ((error?:Error, response?:any) => void) = ():((error?:Error, response?:any) => void) => {
                    var options:any = getOptions(),
                        id:number = <number>options.id;
                    return this.findHadlerById(id) || null;
                };

            data = Buffer.concat([data, buffer]);
            do {
                string = data.toString("utf8");
                index = string.indexOf("\n");
                if (index !== -1) {
                    response = string.slice(0, index + 1);
                    callback = getCallback();
                    if (typeof callback === "function") {
                        callback(getError(), getResult());
                    }
                    data = data.slice((new Buffer(response, "utf8")).length + 1);
                }
            } while (index !== -1);

        });
        this._socket = socket;
    }

    public disconnect(callback:(error?:Error) => void):void {
        // todo: реализовать потом
        setTimeout(():void => {
            callback(null);
        }, 0);
    }

}

export = Client;
