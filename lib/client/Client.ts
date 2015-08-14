/// <reference path="./IClient.ts" />
/// <reference path="./IOptions.ts" />
/// <reference path="../node.d.ts" />

import IClient = require("./IClient");
import IOptions = require("./IOptions");
import net = require("net");

class Client implements IClient {

    protected _location:string;

    protected _socket:net.Socket;

    protected _started:boolean;

    constructor(options:IOptions) {
        this.setLocation(options.location);
    }

    protected setLocation(value:string):void {
        this._location = value;
    }

    protected getLocation():string {
        return this._location;
    }

    public connect(callback:(error?:Error) => void):void {
        var handler:(error?:Error) => void = (error?:Error):void => {
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
        socket.addListener("data", (data:Buffer):void => {

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
