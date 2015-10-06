/// <reference path="../../types/node/node.d.ts" />

import IClient = require("./IClient");
import IOptions = require("./IOptions");
import net = require("net");
import WrapperException = require("../WrapperException");
import Exception = require("../Exception");
import isDefined = require("../isDefined");
import MeLocationHelper = require("../helpers/MeLocationHelper");
import IMeLocationHelper = require("../helpers/IMeLocationHelper");
import HandlersRegistration = require("../helpers/HandlersRegistration");
import IHandlersRegistration = require("../helpers/IHandlersRegistration");

class Client implements IClient {

    private _socket:net.Socket;

    private _started:boolean = false;

    private _handlersRegistration:IHandlersRegistration;

    protected createHandlersRegistration():IHandlersRegistration {
        return new HandlersRegistration();
    }

    protected getHandlersRegistration():IHandlersRegistration {
        if (!this._handlersRegistration) {
            this._handlersRegistration = this.createHandlersRegistration();
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

    protected call(callback:(errors:Error[], response:any) => void, ...args:any[]):void {
        var request:string;
        if (!this._socket) {
            throw new Exception("Client wasn't connect");
        }
        if (typeof callback !== "function") {
            throw new Exception("bla bla bla");
        }
        request = JSON.stringify({
            id   : this.getHandlersRegistration().register(callback),
            args : args
        });
        this._socket.write(request + "\n");
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
            socket:net.Socket = net.createConnection(this.getLocation(), ():void => {
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
                    return this.getHandlersRegistration().find(id) || null;
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
