/// <reference path="../../types/node/node.d.ts" />

import IClient = require("./IClient");
import IOptions = require("./IOptions");
import fs = require("fs");
import net = require("net");
import log4js   = require("../../logger");
import deferred = require("../deferred");
import isFunction = require("../isFunction");
import Exception = require("../exception/Exception");
import IException = require("../exception/IException");
import IExceptionOptions = require("../exception/IOptions");
import isDefined = require("../isDefined");
import isFunction = require("../isFunction");
import MeLocationHelper = require("../helpers/MeLocationHelper");
import IMeLocationHelper = require("../helpers/IMeLocationHelper");
import HandlersRegistrationHelper = require("../helpers/HandlersRegistrationHelper");
import IHandlersRegistrationHelper = require("../helpers/IHandlersRegistrationHelper");

var logger:log4js.Logger = log4js.getLogger("client");

class Client implements IClient {

    private _server:net.Socket = null;

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

    constructor(options:IOptions) {
        if (options && isDefined(options.location)) {
            this.setLocation(options.location);
        }
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

    protected call(callback?:(errors:IException[], response:any) => void, ...args:any[]):void {
        var request:string;

        function handler(errors:IException[], response:any):void {
            if (isFunction(callback)) {
                callback(errors, response);
            }
        }

        deferred([
            (next:() => void):void => {
                this.connect((errors:IException[]):void => {
                    if (errors && errors.length) {
                        handler(errors);
                    } else {
                        next();
                    }
                })
            },
            ():void => {
                if (this._server) {
                    request = JSON.stringify({
                        id   : this.getHandlersRegistrationHelper().register(callback),
                        args : args
                    });
                    this._server.write(request);
                    this._server.write(new Buffer([0x00]));
                } else {
                    setTimeout(():void => {
                        handler([new Exception({message : "connection is not ready"})]);
                    }, 0);
                }
            }
        ]);
    }

    public connect(callback?:(errors:IException[]) => void):void {
        var connected:(errors:IException[]) => void =
                (errors:IException[]):void => {
                    function call(callback:(errors:IException[]) => void):void {
                        setTimeout(():void => {
                            callback(errors);
                        }, 0);
                    }

                    while (this._connectCallbacks.length) {
                        call(this._connectCallbacks.shift());
                    }

                    if (this._needDisconnect) {
                        this.disconnect();
                    }
                };

        deferred([
            (next:() => void):void => {
                if (isFunction(callback)) {
                    this._connectCallbacks.push(callback);
                }
                next();
            },
            (next:() => void):void => {
                var data:Buffer,
                    server:net.Socket,
                    handler:(error:NodeJS.ErrnoException) => void =
                        (error:NodeJS.ErrnoException):void => {
                            server.removeListener("error", handler);
                            server.addListener("error", (error:NodeJS.ErrnoException):void => {
                                logger.error(error);
                            });
                            this._connecting = false;
                            if (error) {
                                this._server       = null;
                                this._connected    = false;
                                this._disconnected = true;
                                connected(Exception.convertFromError(error, {
                                    code    : error.code,
                                    errno   : error.errno,
                                    path    : error.path,
                                    syscall : error.syscall
                                }));
                            } else {
                                this._server       = server;
                                this._connected    = true;
                                this._disconnected = false;
                                connected(null);
                            }
                        };
                if (this._disconnecting) {
                    this._needConnect = true;
                } else if (!this._connected && !this._connecting) {
                    this._connecting = true;
                    this._needConnect = false;
                    data = new Buffer(0);
                    server = net.createConnection(this.getLocation(), ():void => {
                        handler(null);
                    });
                    server.addListener("error", handler);
                    server.addListener("data", (buffer:Buffer):void => {
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
                            if (typeOf(options().errors) === "array") {
                                (<IExceptionOptions[]>options().errors).map((error:IExceptionOptions):IException => {
                                    return new Exception(error);
                                })
                            }
                            return null;
                        }

                        function result():any {
                            return options().result || null;
                        }

                        data   = Buffer.concat([data, buffer]);
                        temp   = data;
                        length = data.length;
                        for (index = 0; index < length; index++) {
                            if (data[index] === 0x00) {
                                diff     = data.length - temp.length;
                                temp     = data.slice(index + 1);
                                response = data.slice(diff, index).toString("utf8");
                                callback = <(errors:IException[], response?:any) => void>this.getHandlersRegistrationHelper().find(<string>options().id) || null;
                                if (isFunction(callback)) {
                                    callback(errors(), result());
                                }
                            }
                        }
                        data = temp;
                    });
                } else {
                    next();
                }
            },
            ():void => {
                if (this._connected && !this._disconnecting) {
                    connected(null);
                }
            }
        ]);
    }

    public disconnect(callback?:(errors:IException[]) => void):void {
        var disconnected:(errors:IException[]) => void =
                (errors:IException[]):void => {
                    function call(callback:(errors:IException[]) => void):void {
                        setTimeout(():void => {
                            callback(errors);
                        }, 0);
                    }

                    while (this._disconnectCallbacks.length) {
                        call(this._disconnectCallbacks.shift());
                    }

                    if (this._needConnect) {
                        this.connect();
                    }
                };
        deferred([
            (next:() => void):void => {
                if (isFunction(callback)) {
                    this._disconnectCallbacks.push(callback);
                }
                next();
            },
            (next:() => void):void => {
                this._server.removeListener("data");
                this._server.close(() => {

                });
            },
            (next:() => void):void => {
                fs.unlink(this.getLocation(), (error:NodeJS.ErrnoException):void => {

                });
            }
        ]);
    }

}

export = Client;
