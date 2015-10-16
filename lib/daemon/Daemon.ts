/// <reference path="../../types/node/node.d.ts" />
/// <reference path="../../types/log4js/log4js.d.ts" />

import isFunction = require("../isFunction");
import IDaemon = require("./IDaemon");
import IOptions = require("./IOptions");
import net = require("net");
import log4js      = require("log4js");
import Exception = require("../exception/Exception");
import IException = require("../exception/IException");
import IMeLocationHelper = require("../helpers/IMeLocationHelper");
import MeLocationHelper = require("../helpers/MeLocationHelper");

require("../../logger");
var logger:log4js.Logger = log4js.getLogger("daemon");

abstract class Daemon implements IDaemon {

    protected _server:net.Server;

    protected _starting:boolean = false;

    protected _stopping:boolean = false;

    protected _started:boolean = false;

    protected _stopped:boolean = true;

    private _meLocationHelper:IMeLocationHelper;

    protected createMeLocationHelper():IMeLocationHelper {
        return new MeLocationHelper();
    }

    protected getMeLocationHelper():IMeLocationHelper {
        if (!this._meLocationHelper) {
            this._meLocationHelper = this.createMeLocationHelper();
        }
        return this._meLocationHelper;
    }

    constructor(options:IOptions) {
        this.setLocation(options.location);
    }

    public get location():string {
        return this.getLocation();
    }

    public set location(value:string) {
        this.setLocation(value);
    }

    public getLocation():string {
        return this.getMeLocationHelper().getLocation();
    }

    public setLocation(value:string):void {
        this.getMeLocationHelper().setLocation(value);
    }

    protected handler(request:any, callback:(response:any) => void):void {
        if (!request) {
            setTimeout(():void => {
                callback({});
            }, 0)
        } else {
            setTimeout(():void => {
                callback({id: String(request.id)});
            }, 0)
        }
    }

    public start(callback?:(errors:IException[]) => void):void {
        function handler(errors:IException[]):void {
            if (isFunction(callback)) {
                callback(errors);
            }
        }

        function parse(json:string):void {
            try {
                return JSON.parse(String(json || "null"));
            } catch (error) {
                return null;
            }
        }

        var listen:(error?:Error) => void = (error?:Error):void => {
            server.removeListener("error", listen);
            if (error) {
                this._server = undefined;
                handler([Exception.convertFromError(error)]);
            } else {
                logger.info("opened daemon", this._server.address());
                this._started = true;
                handler(null);
            }
        };

        var server:net.Server = net.createServer((socket:net.Socket):void => {
            var data = new Buffer(0);

            socket.addListener("error", (error:Error):void => {
                logger.error(Exception.convertFromError(error).getStack());
            });

            socket.addListener("data", (buffer:Buffer):void => {
                var index:number,
                    request:string;
                data = Buffer.concat([data, buffer]);
                index = data.indexOf(0x0a);
                while (index !== -1) {
                    request = data.slice(0, index).toString("utf8");
                    data    = data.slice(index + 1);
                    index   = data.indexOf(0x0a);
                    this.handler(parse(request), (response:any):void => {
                        socket.write(JSON.stringify(response));
                        socket.write(new Buffer([0x0a]));
                    });
                }
            });

            socket.addListener("end", ():void => {
                var index:number = this._sockets.indexOf(socket);
                if (index !== -1) {
                    this._sockets.splice(index, 1);
                }
                logger.info("client disconnected");
            });

        });

        server.addListener("error", listen);
        server.addListener("close", ():void => {
            logger.info("server closed");
        });
        server.addListener("connection", (socket:net.Socket):void => {
            this._sockets.push(socket);
        });
        server.listen(this.getLocation(), listen);
        this._server = server;
    }

    private _sockets:net.Socket[] = [];

    public stop(callback?:(errors:IException[]) => void):void {
        function handler(errors:IException[]):void {
            if (isFunction(callback)) {
                callback(errors);
            }
        }

        setTimeout(():void => {

        /*if (!this._server) {
            handler([new Exception({message : "daemon cannot be stopped"})]);
        } else if (!this._started) {
            // throw new Exception({message: "daemon cannot be stopped"});
        } else {*/
            console.log("closing"); // todo: not working !!!

            this._server.close(():void => {
                console.log("!!! CLOSED !!!");
                /*this._server  = undefined;
                this._started = false;
                handler(null);*/
            });

        this._sockets.forEach((socket:net.Socket):void => {
            socket.destroy();
        });

        /*}*/
        });
    }

}

export = Daemon;