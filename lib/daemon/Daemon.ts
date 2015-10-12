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
                logger.info("Opened daemon", this._server.address());
                this._started = true;
                handler(null);
            }
        };

        var server:net.Server = net.createServer((socket:net.Socket):void => {
            var data = new Buffer(0);

            socket.addListener("error", (error:Error):void => {
                logger.warn(Exception.convertFromError(error).getStack());
            });

            socket.addListener("data", (buffer:Buffer):void => {
                var index:number,
                    request:string,
                    str:string;
                data = Buffer.concat([data, buffer]);
                do {
                    str   = data.toString("utf8");
                    index = str.indexOf("\n");
                    if (index !== -1) {
                        // todo: reimplement
                        request = str.slice(0, index + 1);
                        data    = data.slice((new Buffer(request, "utf8")).length + 1);
                        this.handler(parse(request), (response:any):void => {
                            socket.write(JSON.stringify(response));
                            socket.write(new Buffer([0x0a]));
                        });
                    }
                } while (index !== -1)
            });

            socket.addListener("end", ():void => {
                logger.info("Client disconnected");
            });

        });

        server.addListener("error", listen);
        server.listen(this.getLocation(), listen);
        this._server = server;
    }

    public stop(callback?:(errors:IException[]) => void):void {
        function handler(errors:IException[]):void {
            if (isFunction(callback)) {
                callback(errors);
            }
        }

        if (!this._server) {
            handler([new Exception({message : "daemon cannot be stopped"})]);
        } else if (!this._started) {
            // throw new Exception({message: "daemon cannot be stopped"});
        } else {
            this._server.close(():void => {
                this._server  = undefined;
                this._started = false;
                handler(null);
            });
        }
    }

}

export = Daemon;