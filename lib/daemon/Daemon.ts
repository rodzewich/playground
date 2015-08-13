/// <reference path="./IDaemon.ts" />
/// <reference path="./../node.d.ts" />

import IDaemon = require("./IDaemon");
import IOptions = require("./IOptions");
import path = require("path");
import net = require("net");

class Daemon implements IDaemon {

    protected _location:string;

    protected _server:net.Server;

    protected _started: boolean = false;

    constructor(options:IOptions) {
        this.setLocation(options.location);
    }

    protected setLocation(value: string): void {
        this._location = value;
    }

    protected getLocation(): string {
        return this._location;
    }

    protected requestHandler(request:any, callback:(response:any) => void):void {
        var id:number;
        if (!request) {
            setTimeout(():void => {
                callback({});
            }, 0)
        } else {
            id = Math.max(0, parseInt(String(request.id || 0), 10) || 0);
            setTimeout(():void => {
                callback({id: id});
            }, 0)
        }
    }

    public start(callback?:(error?:Error) => void):void {
        var handler:(error?:Error) => void = (error?:Error):void => {
                server.removeListener("error", handler);
                if (error) {
                    this._server = undefined;
                } else {
                    this._started = true;
                }
                callback(error || null);
            },
            parseRequest:(request:string) => void = (request:string):void => {
                try {
                    return JSON.parse(String(request || ""));
                } catch (error) {
                    return null;
                }
            },
            server:net.Server = net.createServer((socket:net.Socket):void => {
                var data = new Buffer(0);
                socket.addListener("error", (error):void => {
                    console.log("error", error);
                });
                socket.addListener("data", (buffer:Buffer):void => {
                    var index:number;
                    var request:string;
                    var str:string;
                    data = Buffer.concat([data, buffer]);
                    do {
                        str = data.toString("utf8");
                        index = str.indexOf("\n");
                        if (index !== -1) {
                            request = str.slice(0, index + 1);
                            data = data.slice((new Buffer(request, "utf8")).length + 1);
                            this.requestHandler(parseRequest(request), (response:any):void => {
                                socket.write(JSON.stringify(response));
                                socket.write("\n");
                            });
                        }
                    } while (index !== -1)
                });
                socket.addListener("end", ():void => {
                    console.log("client disconnected");
                });
            });
        server.addListener("error", handler);
        server.listen(this.getLocation(), handler);
        this._server = server;
    }

    public stop(callback?:() => void):void {
        if (!this._started) {
            throw new Error("bla bla bla");
        }
        this._server.close((): void => {
            this._server = undefined;
            this._started = false;
        });
    }

}