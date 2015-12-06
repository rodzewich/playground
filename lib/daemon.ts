/// <reference path="../types/node/node.d.ts" />
/// <reference path="../types/log4js/log4js.d.ts" />

import * as net from "net";
import * as log4js "log4js";
import {isFunction, isDefined} from "./utils/common";
import {IException, Exception} from "./exception";
import {IDebugHelper, DebugHelper} from "./helpers/debugHelper";
import {IMeLocationHelper, MeLocationHelper} from "./helpers/meLocationHelper";

var logger:log4js.Logger = log4js.getLogger("daemon");

export interface IOptions {
    location?: string;
    debug?:boolean;
}

export interface IDaemon {
    location: string;
    started:boolean;
    starting:boolean;
    stopped:boolean;
    stopping:boolean;
    debug:boolean;
    start(callback?:(errors:IException[]) => void):void;
    stop(callback?:(errors:IException[]) => void):void;
    isStarting():boolean;
    isStopping():boolean;
    isStarted():boolean;
    isStopped():boolean;
    getLocation():string;
    setLocation(value:string):void;
    isDebug():boolean;
    getIsDebug():boolean;
    setIsDebug(value:boolean):void;
}

export abstract class Daemon implements IDaemon {

    private _daemon:net.Server = null;

    private _starting:boolean = false;

    private _stopping:boolean = false;

    private _started:boolean = false;

    private _stopped:boolean = true;

    private _needStart:boolean = false;

    private _needStop:boolean = false;

    private _startCallbacks:((errors:IException[]) => void)[] = [];

    private _stopCallbacks:((errors:IException[]) => void)[] = [];

    private _sockets:net.Socket[] = [];

    private _meLocationHelper:IMeLocationHelper;

    private _debugHelper:IDebugHelper;

    protected createDebugHelper():IDebugHelper {
        return new DebugHelper();
    }

    protected getDebugHelper():IDebugHelper {
        if (!this._debugHelper) {
            this._debugHelper = this.createDebugHelper();
        }
        return this._debugHelper;
    }

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
        if (options && isDefined(options.location)) {
            this.setLocation(options.location);
        }
        if (options && isDefined(options.debug)) {
            this.setIsDebug(options.debug);
        }
    }

    public get debug():boolean {
        return this.getIsDebug();
    }

    public set debug(value:boolean) {
        this.setIsDebug(value);
    }

    public isDebug():boolean {
        return this.getDebugHelper().isDebug();
    }

    public getIsDebug():boolean {
        return this.getDebugHelper().getIsDebug();
    }

    public setIsDebug(value:boolean):void {
        this.getDebugHelper().setIsDebug(value);
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

    public get starting():boolean {
        return this.isStarting();
    }

    public set starting(value:boolean) {
        throw new Exception({message: "property \"starting\" is readonly"});
    }

    public isStarting():boolean {
        return this._starting;
    }

    public get started():boolean {
        return this.isStarted();
    }

    public set started(value:boolean) {
        throw new Exception({message: "property \"started\" is readonly"});
    }

    public isStarted() {
        return this._started;
    }

    public get stopping():boolean {
        return this.isStopping();
    }

    public set stopping(value:boolean) {
        throw new Exception({message: "property \"stopping\" is readonly"});
    }

    public isStopping():boolean {
        return this._stopping;
    }

    public get stopped():boolean {
        return this.isStopped();
    }

    public set stopped(value:boolean) {
        throw new Exception({message: "property \"stopped\" is readonly"});
    }

    public isStopped():boolean {
        return this._stopped;
    }

    protected handler(request:any, callback:(response:any) => void):void {
        if (!request) {
            setTimeout(():void => {
                callback({});
            }, 0).ref();
        } else {
            setTimeout(():void => {
                callback({id: String(request.id)});
            }, 0).ref();
        }
    }

    public start(callback?:(errors:IException[]) => void):void {
        function parse(json:string):void {
            try {
                return JSON.parse(String(json || "null"));
            } catch (error) {
                return null;
            }
        }

        var daemon:net.Server,
            started:(errors:IException[]) => void = (errors:IException[]):void => {
                function call(callback:(errors:IException[]) => void):void {
                    setTimeout(():void => {
                        callback(errors);
                    }, 0).ref();
                }

                while (this._startCallbacks.length) {
                    call(this._startCallbacks.shift());
                }

                if (this._needStop) {
                    this.stop();
                }
            },
            listen:(error:Error) => void = (error:Error):void => {
                daemon.removeListener("error", listen);
                this._starting = false;
                if (error) {
                    this._daemon  = null;
                    this._started = false;
                    this._stopped = true;
                    logger.error(Exception.convertFromError(error).getStack());
                    started([Exception.convertFromError(error)]);
                } else {
                    this._daemon  = daemon;
                    this._started = true;
                    this._stopped = false;
                    logger.info("daemon started", this._daemon.address());
                    started(null);
                }
            };

        if (isFunction(callback)) {
            this._startCallbacks.push(callback);
        }
        if (this._stopping) {
            this._needStart = true;
        } else if (!this._started && !this._starting) {
            this._starting = true;
            this._needStart = false;
            daemon = net.createServer((socket:net.Socket):void => {
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
            daemon.addListener("error", listen);
            daemon.addListener("close", ():void => {
                logger.info("daemon stopped");
            });
            daemon.addListener("connection", (socket:net.Socket):void => {
                this._sockets.push(socket);
            });
            daemon.listen(this.getLocation(), listen);

        } else if (this._started && !this._stopping) {
            started(null);
        }

    }

    public stop(callback?:(errors:IException[]) => void):void {

        var stopped:(errors:IException[]) => void = (errors:IException[]):void => {
            function call(callback:(errors:IException[]) => void):void {
                setTimeout(():void => {
                    callback(errors);
                }, 0).ref();
            }

            while (this._stopCallbacks.length) {
                call(this._stopCallbacks.shift());
            }

            if (this._needStart) {
                this.start();
            }
        };

        if (isFunction(callback)) {
            this._stopCallbacks.push(callback);
        }
        if (this._starting) {
            this._needStop = true;
        } else if (!this._stopped && !this._stopping) {
            this._stopping = true;
            this._needStop = false;
            setTimeout(():void => {
                this._daemon.close(():void => {
                    this._daemon   = null;
                    this._started  = false;
                    this._stopped  = true;
                    this._stopping = false;
                    stopped(null);
                });
                while (this._sockets.length) {
                    this._sockets.shift().destroy();
                }
            }, 0).ref();
        } else if (this._stopped && !this._starting) {
            stopped(null);
        }
    }

}
