/// <reference path="../types/node/node.d.ts" />
/// <reference path="../types/log4js/log4js.d.ts" />

import fs     = require("fs");
import net    = require("net");
import colors = require("colors");
import log4js = require("log4js");
import {isNull, isDefined, isFunction, isArray, deferred} from "./utils";
import {IOptions as IExceptionOptions, IException, Exception} from "./exception";
import {IDebugHelper, DebugHelper} from "./helpers/debugHelper";
import {ITimeoutHelper, TimeoutHelper} from "./helpers/timeoutHelper";
import {IMeLocationHelper, MeLocationHelper} from "./helpers/meLocationHelper";
import {IHandlersRegistrationHelper, HandlersRegistrationHelper} from "./helpers/handlersRegistrationHelper";
import {input as displayInput, output as displayOutput, error as displayError} from "./helpers/display";

var logger:log4js.Logger = log4js.getLogger("client");

export interface IOptions {
    location?:string;
    timeout?:number;
    debug?:boolean;
}

export interface IClient {
    location:string;
    timeout:number;
    connected:boolean;
    connecting:boolean;
    disconnected:boolean;
    disconnecting:boolean;
    debug:boolean;
    connect(callback?:(errors:IException[]) => void):void;
    disconnect(callback?:(errors:IException[]) => void):void;
    isConnected():boolean;
    isDisconnected():boolean;
    isConnecting():boolean;
    isDisconnecting():boolean;
    getLocation():string;
    setLocation(location:string):void;
    getTimeout():number;
    setTimeout(timeout:number):void;
    isDebug():boolean;
    getIsDebug():boolean;
    setIsDebug(value:boolean):void;
}

export abstract class Client implements IClient {

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

    private _meLocationHelper:IMeLocationHelper;

    private _debugHelper:IDebugHelper;

    private _timeoutHelper:ITimeoutHelper;

    protected createHandlersRegistrationHelper():IHandlersRegistrationHelper {
        return new HandlersRegistrationHelper();
    }

    protected getHandlersRegistrationHelper():IHandlersRegistrationHelper {
        if (!this._handlersRegistration) {
            this._handlersRegistration = this.createHandlersRegistrationHelper();
        }
        return this._handlersRegistration;
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

    protected createDebugHelper():IDebugHelper {
        return new DebugHelper();
    }

    protected getDebugHelper():IDebugHelper {
        if (!this._debugHelper) {
            this._debugHelper = this.createDebugHelper();
        }
        return this._debugHelper;
    }

    protected createTimeoutHelper():ITimeoutHelper {
        return new TimeoutHelper();
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
        if (options && isDefined(options.debug)) {
            this.setIsDebug(options.debug);
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

    public getLocation():string {
        return this.getMeLocationHelper().getLocation();
    }

    public setLocation(location:string):void {
        this.getMeLocationHelper().setLocation(location);
    }

    public getTimeout():number {
        return this.getTimeoutHelper().getTimeout();
    }

    public setTimeout(timeout:number):void {
        this.getTimeoutHelper().setTimeout(timeout);
    }

    public get connected():boolean {
        return this.isConnected();
    }

    public set connected(value:boolean) {
        throw new Exception({message: "property \"connected\" is readonly"});
    }

    public isConnected():boolean {
        return this._connected;
    }

    public get disconnected():boolean {
        return this.isDisconnected();
    }

    public set disconnected(value:boolean) {
        throw new Exception({message: "property \"disconnected\" is readonly"});
    }

    public isDisconnected():boolean {
        return this._disconnected;
    }

    public get connecting():boolean {
        return this.isConnecting();
    }

    public set connecting(value:boolean) {
        throw new Exception({message: "property \"connecting\" is readonly"});
    }

    public isConnecting():boolean {
        return this._connecting;
    }

    public get disconnecting():boolean {
        return this.isDisconnected();
    }

    public set disconnecting(value:boolean) {
        throw new Exception({message: "property \"disconnecting\" is readonly"});
    }

    public isDisconnecting():boolean {
        return this._disconnecting;
    }

    protected call(callback?:(errors:IException[], response:any) => void, timeout?:number, ...args:any[]):void {
        var request:string,
            timer:NodeJS.Timer,
            alreadyCalled:boolean = false,
            debug:boolean = this.isDebug();

        function handler(errors:IException[], response:any):void {
            if (isFunction(callback) && !alreadyCalled) {
                setTimeout(():void => {
                    callback(errors, response);
                }, 0).ref();
            }
            alreadyCalled = true;
            clearTimeout(timer);
            if (errors && errors.length) {
                errors.forEach((error:IException):void => {
                    displayError(debug, error.getStack());
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
                var id:string,
                    temp:ITimeoutHelper;
                if (this._client) {
                    id = this.getHandlersRegistrationHelper().register(handler);
                    request = JSON.stringify({
                        id   : id,
                        args : args
                    });
                    this._client.write(request);
                    this._client.write(new Buffer([0x0a]));
                    displayInput(debug, request);
                    if (timeout !== -1) {
                        temp = this.createTimeoutHelper();
                        if (timeout) {
                            temp.setTimeout(timeout);
                        }
                        timer = setTimeout(():void => {
                            handler([new Exception({
                                message : "request timed out",
                                data : {
                                    requestId : id
                                }
                            })], null);
                        }, timeout ? temp.getTimeout() : this.getTimeout());
                        timer.ref();
                    }
                } else {
                    logger.warn("connection is not ready");
                    handler([new Exception({message : "connection is not ready"})], null);
                }
            }
        ]);
    }

    public connect(callback?:(errors:IException[]) => void):void {
        var data:Buffer,
            client:net.Socket,
            debug:boolean = this.isDebug(),
            connected:(errors:IException[]) => void =
                (errors:IException[]):void => {
                    function call(callback:(errors:IException[]) => void):void {
                        setTimeout(():void => {
                            callback(errors);
                        }, 0).ref();
                    }

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
                        var exception:IException = Exception.convertFromError(error, {
                            code    : error.code,
                            errno   : error.errno,
                            path    : error.path,
                            syscall : error.syscall
                        });
                        displayError(debug, exception.getStack())
                        logger.error(exception.getStack());
                    });
                    client.addListener("close", ():void => {
                        displayInput(debug, "closed connection");
                        logger.info("closed connection");
                        this.disconnect();
                    });
                    this._connecting = false;
                    if (error) {
                        this._client       = null;
                        this._connected    = false;
                        this._disconnected = true;
                        displayError(debug, "can not connect to: " + this.getLocation());
                        logger.error(Exception.convertFromError(error).getStack());
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
                        displayInput(debug, "successful connected to: " + this.getLocation());
                        logger.info("successful connected to: " + this.getLocation());
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
                    if (isNull(this.getLocation())) {
                        connected([new Exception({message: "location is not defined"})]);
                    } else {
                        next();
                    }
                },
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
                        var cache:any,
                            index:number,
                            response:string,
                            callback:(errors:IException[], response?:any) => void;

                        displayOutput(debug, buffer.toString("utf8"))

                        function options():any {
                            try {
                                return JSON.parse(response) || {};
                            } catch (error) {
                                return {};
                            }
                        }

                        function errors():IException[] {
                            if (isArray(cache.errors)) {
                                return (<IExceptionOptions[]>cache.errors).map((error:IExceptionOptions):IException => {
                                    var exception:IException = new Exception(error);
                                    displayError(debug, exception.getStack());
                                    logger.error(exception.getStack());
                                    return exception;
                                })
                            }
                            return null;
                        }

                        function result():any {
                            return cache.result || null;
                        }

                        data = Buffer.concat([data, buffer]);
                        index = data.indexOf(0x0a);
                        while (index !== -1) {
                            response = data.slice(0, index).toString("utf8");
                            data = data.slice(index + 1);
                            cache = options();
                            callback = <(errors:IException[], response?:any) => void>this.getHandlersRegistrationHelper().find(<string>cache.id) || null;
                            index = data.indexOf(0x0a);
                            if (isFunction(callback)) {
                                callback(errors(), result());
                            }
                        }

                    });
                }
            ]);
        } else if (this._connected && !this._disconnecting) {
            connected(null);
        }
    }

    public disconnect(callback?:(errors:IException[]) => void):void {
        var debug:boolean = this.isDebug(),
            disconnected:(errors:IException[]) => void = (errors:IException[]):void => {
                function call(callback:(errors:IException[]) => void):void {
                    setTimeout(():void => {
                        callback(errors);
                    }, 0).ref();
                }

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
        if (this._connecting) {
            this._needDisconnect = true;
        } else if (!this._disconnected && !this._disconnecting) {
            this._disconnecting  = true;
            this._needDisconnect = false;
            this._client.removeAllListeners("data");
            this._client.destroy();
            setTimeout(():void => {
                displayInput(debug, "successful disconnected from: " + this.getLocation());
                logger.info("successful disconnected from: " + this.getLocation());
                this._client        = null;
                this._connected     = false;
                this._disconnected  = true;
                this._disconnecting = false;
                disconnected(null);
            }, 0).ref();
        } else if (this._disconnected && !this._connecting) {
            disconnected(null);
        }
    }

}
