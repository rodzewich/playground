/// <reference path="../../types/node/node.d.ts" />

import IClient = require("./IClient");
import IOptions = require("./IOptions");
import fs = require("fs");
import net = require("net");
import log4js   = require("../../logger");
import deferred = require("../deferred");
import Exception = require("../exception/Exception");
import IException = require("../exception/IException");
import IExceptionOptions = require("../exception/IOptions");
import isDefined = require("../isDefined");
import isFunction = require("../isFunction");
import isArray = require("../isArray");
import MeLocationHelper = require("../helpers/MeLocationHelper");
import IMeLocationHelper = require("../helpers/IMeLocationHelper");
import HandlersRegistrationHelper = require("../helpers/HandlersRegistrationHelper");
import IHandlersRegistrationHelper = require("../helpers/IHandlersRegistrationHelper");
import TimeoutHelper = require("../helpers/TimeoutHelper");
import ITimeoutHelper = require("../helpers/ITimeoutHelper");

var logger:log4js.Logger = log4js.getLogger("client");

class Client implements IClient {

    private _client:net.Socket = null;

    private _connecting:boolean = false;

    private _disconnecting:boolean = false;

    private _connected:boolean = false;

    private _disconnected:boolean = false;

    private _connectCallbacks:((errors:IException[]) => void)[] = [];

    private _disconnectCallbacks:((errors:IException[]) => void)[] = [];

    private _needConnect:boolean = false;

    private _needDisconnect:boolean = false;

    private _handlersRegistration:IHandlersRegistrationHelper;

    protected createHandlersRegistrationHelper():IHandlersRegistrationHelper {
        return new HandlersRegistrationHelper();
    }

    protected getHandlersRegistrationHelper():IHandlersRegistrationHelper {
        if (!this._handlersRegistration) {
            this._handlersRegistration = this.createHandlersRegistrationHelper();
        }
        return this._handlersRegistration;
    }

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

    private _timeoutHelper:ITimeoutHelper;

    protected createTimeoutHelper():ITimeoutHelper {
        return new TimeoutHelper(50);
    }

    protected getTimeoutHelper():ITimeoutHelper {
        if (!this._timeoutHelper) {
            this._timeoutHelper = this.createTimeoutHelper();
        }
        return this._timeoutHelper;
    }

    constructor(options:IOptions) {
        if (options && isDefined(options.location)) {
            this.setLocation(options.location);
        }
        if (options && isDefined(options.timeout)) {
            this.setTimeout(options.timeout);
        }
    }

    public get location():string {
        return this.getLocation();
    }

    public set location(location:string) {
        this.setLocation(location);
    }

    public get timeout():number {
        return this.getTimeout();
    }

    public set timeout(timeout:number) {
        this.setTimeout(timeout);
    }

    public getLocation():string {
        return this.getMeLocationHelper().getLocation();
    }

    public setLocation(location:string):void {
        this.getMeLocationHelper().setLocation(location);
    }

    public getTimeout():number {
        return this.getTimeoutHelper().getValue();
    }

    public setTimeout(timeout:number):void {
        this.getTimeoutHelper().setValue(timeout);
    }

    protected call(callback?:(errors:IException[], response:any) => void, ...args:any[]):void {
        var request:string,
            timeout:NodeJS.Timer,
            alreadyCalled:boolean = false;

        function handler(errors:IException[], response:any):void {
            if (isFunction(callback) && !alreadyCalled) {
                setTimeout(():void => {
                    callback(errors, response);
                }, 0);
            }
            alreadyCalled = true;
            clearTimeout(timeout);
            if (errors && errors.length) {
                errors.forEach((error:IException):void => {
                    logger.error(error.getStack());
                });
            }
        }

        deferred([
            (next:() => void):void => {
                this.connect((errors:IException[]):void => {
                    if (errors && errors.length) {
                        handler(errors, null);
                    } else {
                        next();
                    }
                })
            },
            ():void => {
                if (this._client) {
                    request = JSON.stringify({
                        id   : this.getHandlersRegistrationHelper().register(handler),
                        args : args
                    });
                    this._client.write(request);
                    this._client.write(new Buffer([0x0a]));
                    timeout = setTimeout(():void => {
                        handler([new Exception({message : "bla bla bla"})], null);
                    }, this.getTimeout());
                } else {
                    logger.warn("connection is not ready");
                    handler([new Exception({message : "connection is not ready"})], null);
                }
            }
        ]);
    }

    public connect(callback?:(errors:IException[]) => void):void {
        logger.info("connecting to: " + this.getLocation());
        var data:Buffer,
            client:net.Socket,
            connected:(errors:IException[]) => void =
                (errors:IException[]):void => {
                    var call:(callback:(errors:IException[]) => void) => void =
                        (callback:(errors:IException[]) => void):void => {
                        setTimeout(():void => {
                            logger.info("connected to: " + this.getLocation());
                            callback(errors);
                        }, 0);
                    };

                    while (this._connectCallbacks.length) {
                        call(this._connectCallbacks.shift());
                    }

                    if (this._needDisconnect) {
                        this.disconnect();
                    }
                },
            handler:(error:NodeJS.ErrnoException) => void =
                (error:NodeJS.ErrnoException):void => {
                    client.removeListener("error", handler);
                    client.addListener("error", (error:NodeJS.ErrnoException):void => {
                        logger.error(error.stack);
                    });
                    client.addListener("close", ():void => {
                        logger.error("server closed connection");
                        this.disconnect();
                    });
                    this._connecting = false;
                    if (error) {
                        this._client       = null;
                        this._connected    = false;
                        this._disconnected = true;
                        connected([Exception.convertFromError(error, {
                            code    : error.code,
                            errno   : error.errno,
                            path    : error.path,
                            syscall : error.syscall
                        })]);
                    } else {
                        this._client       = client;
                        this._connected    = true;
                        this._disconnected = false;
                        connected(null);
                    }
                };

        if (isFunction(callback)) {
            this._connectCallbacks.push(callback);
        }
        if (this._disconnecting) {
            this._needConnect = true;
        } else if (!this._connected && !this._connecting) {
            this._connecting = true;
            this._needConnect = false;
            deferred([
                (next:() => void):void => {
                    fs.stat(this.getLocation(), (error:NodeJS.ErrnoException, stats:fs.Stats):void => {
                        if (error && error.code !== "ENOENT") {
                            connected([Exception.convertFromError(error, {
                                code    : error.code,
                                errno   : error.errno,
                                path    : error.path,
                                syscall : error.syscall
                            })]);
                        } else if (error && error.code === "ENOENT" ||
                            stats && !stats.isSocket()) {
                            connected([new Exception({
                                message : "socket is not exists",
                                data    : {
                                    code    : error.code,
                                    errno   : error.errno,
                                    path    : error.path,
                                    syscall : error.syscall
                                }
                            })]);
                        } else {
                            next();
                        }
                    });
                },
                ():void => {
                    data = new Buffer(0);
                    client = net.createConnection(this.getLocation(), ():void => {
                        handler(null);
                    });
                    client.addListener("error", handler);
                    client.addListener("data", (buffer:Buffer):void => {
                        var temp:Buffer,
                            diff:number,
                            cache:any,
                            index:number,
                            length:number,
                            response:string,
                            callback:(errors:IException[], response?:any) => void;

                        function options():any {
                            if (!isDefined(cache)) {
                                try {
                                    cache = JSON.parse(response) || {};
                                } catch (error) {
                                    cache = {};
                                }
                            }
                            return cache;
                        }

                        function errors():IException[] {
                            if (isArray(options().errors)) {
                                (<IExceptionOptions[]>options().errors).map((error:IExceptionOptions):IException => {
                                    var exception:IException = new Exception(error);
                                    logger.warn(exception.getStack());
                                    return exception;
                                })
                            }
                            return null;
                        }

                        function result():any {
                            return options().result || null;
                        }

                        data = Buffer.concat([data, buffer]);
                        temp = data;
                        length = data.length;
                        for (index = 0; index < length; index++) {
                            if (data[index] === 0x0a) {
                                diff = data.length - temp.length;
                                temp = data.slice(index + 1);
                                response = data.slice(diff, index).toString("utf8");
                                callback = <(errors:IException[], response?:any) => void>this.getHandlersRegistrationHelper().find(<string>options().id) || null;
                                if (isFunction(callback)) {
                                    callback(errors(), result());
                                }
                            }
                        }
                        data = temp;
                    });
                }
            ]);
        } else if (this._connected && !this._disconnecting) {
            connected(null);
        }
    }

    public disconnect(callback?:(errors:IException[]) => void):void {
        logger.info("disconnecting from: " + this.getLocation());
        var disconnected:(errors:IException[]) => void =
                (errors:IException[]):void => {
                    var call:(callback:(errors:IException[]) => void) => void =
                        function call(callback:(errors:IException[]) => void):void {
                            setTimeout(():void => {
                                logger.info("disconnected from: " + this.getLocation());
                                callback(errors);
                            }, 0);
                        };

                    while (this._disconnectCallbacks.length) {
                        call(this._disconnectCallbacks.shift());
                    }

                    if (this._needConnect) {
                        this.connect();
                    }
                };
        if (isFunction(callback)) {
            this._disconnectCallbacks.push(callback);
        }
        if (!this._connecting) {
            this._needDisconnect = true;
        } else if (!this._disconnected && !this._disconnecting) {
            this._disconnecting  = true;
            this._needDisconnect = false;
            this._client.removeAllListeners("data");
            this._client.destroy();
            this._client = null;
            setTimeout(():void => {
                disconnected(null);
            }, 0);
        } else if (this._disconnected && !this._connecting) {
            disconnected(null);
        }
    }

}

export = Client;
