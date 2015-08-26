/// <reference path="../../client/Client.ts" />
/// <reference path="./IClient.ts" />
/// <reference path="./IOptions.ts" />
/// <reference path="../Exception.ts" />
/// <reference path="../../../types/node/node.d.ts" />
/// <reference path="../../deferred.ts" />
/// <reference path="../../typeOf" />
/// <reference path="../../../types/log4js/log4js.d.ts" />
/// <reference path="../../../logger" />

import typeOf = require("../../typeOf");
import deferred = require("../../deferred");
import WrapperException = require("../../WrapperException");
import BaseClient = require("../../client/Client");
import IOptions = require("./IOptions");
import Exception = require("../Exception");
import IClient = require("./IClient");
import IResponse = require("./IResponse");
import IRequest = require("./IRequest");
import cp = require("child_process");
import log4js      = require("../../../logger");
var logger:log4js.Logger = log4js.getLogger("worker");

class Client extends BaseClient implements IClient {

    private _sourcesDirectory: string;

    constructor(options:IOptions) {
        super(options);
        if (options && typeOf(options.sourcesDirectory) !== "undefined") {
            this.setSourcesDirectory(options.sourcesDirectory);
        }
        if (options && typeOf(options.memoryLocation) !== "undefined") {
            this.setMemoryLocation(options.memoryLocation);
        }
        if (options && typeOf(options.useCache) !== "undefined") {
            this.setUseCache(options.useCache);
        }
        if (options && typeOf(options.errorBackgroundColor) !== "undefined") {
            this.setErrorBackgroundColor(options.errorBackgroundColor);
        }
        if (options && typeOf(options.errorTextColor) !== "undefined") {
            this.setErrorTextColor(options.errorTextColor);
        }
        if (options && typeOf(options.errorBlockPadding) !== "undefined") {
            this.setErrorBlockPadding(options.errorBlockPadding);
        }
        if (options && typeOf(options.errorFontSize) !== "undefined") {
            this.setErrorFontSize(options.errorFontSize);
        }
        if (options && typeOf(options.webRootDirectory) !== "undefined") {
            this.setWebRootDirectory(options.webRootDirectory);
        }
    }

    protected getDaemon(): string {
        return null;
    }

    protected getRequest():IRequest {
        return <IRequest>{
            filename: null,
            sourcesDirectory: this.getSourcesDirectory(),
            errorBackgroundColor: this.getErrorBackgroundColor(),
            errorTextColor: this.getErrorTextColor(),
            errorBlockPadding: this.getErrorBlockPadding(),
            errorFontSize: this.getErrorFontSize(),
            webRootDirectory: this.getWebRootDirectory(),
            useCache: this.isUseCache()
        };
    }

    private _webRootDirectory: string = "";

    protected getWebRootDirectory(): string {
        return this._webRootDirectory;
    }

    protected setWebRootDirectory(value: string): void {
        this._webRootDirectory = value;
    }

    private _errorBackgroundColor: string = "#ffff00";

    protected getErrorBackgroundColor(): string {
        return this._errorBackgroundColor;
    }

    protected setErrorBackgroundColor(value: string): void {
        this._errorBackgroundColor = value;
    }

    private _errorTextColor: string = "#000000";

    protected getErrorTextColor(): string {
        return this._errorTextColor;
    }

    protected setErrorTextColor(value: string): void {
        this._errorTextColor = value;
    }

    private _errorBlockPadding: string = "10px";

    protected getErrorBlockPadding(): string {
        return this._errorBlockPadding;
    }

    protected setErrorBlockPadding(value: string): void {
        this._errorBlockPadding = value;
    }

    private _errorFontSize: string = "13px";

    protected getErrorFontSize(): string {
        return this._errorFontSize;
    }

    protected setErrorFontSize(value: string): void {
        this._errorFontSize = value;
    }

    private _useCache: boolean;

    public setUseCache(value: boolean): void {
        this._useCache = value;
    }

    public getUseCache(): boolean {
        return this._useCache;
    }

    public isUseCache(): boolean {
        return !!this._useCache;
    }

    private _memoryLocation: string;

    protected getMemoryLocation(): string {
        return this._memoryLocation;
    }

    protected setMemoryLocation(value: string): void {
        this._memoryLocation = value;
    }

    protected setSourcesDirectory(value: string): void {
        this._sourcesDirectory = value;
    }

    protected getSourcesDirectory(): string {
        return this._sourcesDirectory;
    }

    public compile(filename:string, callback?:(errors?:Error[], result?:IResponse) => void):void {
        var request:IRequest;
        if (typeOf(filename) !== "string") {
            throw new Exception("bla bla bla");
        }
        request = this.getRequest();
        request.filename = filename;
        this.call((errors?:Error[], response?:any):void => {
            var temp:Error[] = null,
                result:any = null;
            if (errors && errors.length) {
                temp = errors;
            } else {
                result = response || null;
            }
            if (typeOf(callback) === "function") {
                callback(temp, <IResponse>result);
            }
        }, "compile", request);
    }

    public connect(callback:(errors?:Error[]) => void): void {
        deferred([
            (next:() => void):void => {
                var command:cp.ChildProcess = cp.spawn(process.execPath, [
                        this.getDaemon(),
                        "--location", this.getLocation(),
                        "--memory", this.getMemoryLocation()
                    ]),
                    data:Buffer = new Buffer(0),
                    echo:(stream:NodeJS.WritableStream, data:Buffer) => void =
                        (stream:NodeJS.WritableStream, data:Buffer):void => {
                            stream.write(data);
                        },
                    handler:(buffer:Buffer) => void = (buffer:Buffer):void => {
                        var result:any,
                            errors:Error[] = [],
                            string:string,
                            index:number,
                            json:string;
                        data   = Buffer.concat([data, buffer]);
                        string = buffer.toString("utf8");
                        index  = string.indexOf("\n");
                        if (index !== -1) {
                            command.stderr.removeListener("data", handler);
                            command.stdout.removeListener("data", handler);
                            command.stderr.addListener("data", (data:Buffer):void => {
                                echo(process.stderr, data);
                            });
                            command.stdout.addListener("data", (data:Buffer):void => {
                                echo(process.stdout, data);
                            });
                            json = string.slice(0, index + 1);
                            try {
                                result = JSON.parse(json) || {started: false, errors: [{message: "Unknown error"}]};
                            } catch (err) {
                                logger.warn("Worker send error content", data.toString("utf8"));
                                process.stderr.write(data);
                                result = {started: false, errors: [WrapperException.convertToObject(err)]};
                            }
                            data = data.slice((new Buffer(json, "utf8")).length + 1);
                            if (!result.started) {
                                if (typeOf(result.errors) === "array") {
                                    errors = (<any[]>result.errors).map((item:any):Error => {
                                        return new WrapperException(item);
                                    });
                                }
                                logger.fatal("Something went wrong", errors); // todo: по другому выводить ошибки
                                callback(errors);
                            } else {
                                logger.info("Less daemon started");
                                next();
                            }
                        }
                    };
                command.stderr.addListener("data", handler);
                command.stdout.addListener("data", handler);
            },
            ():void => {
                super.connect(callback);
            }
        ]);

    }

    public disconnect(callback:(errors?:Error[]) => void): void {

    }


}

export = Client;

