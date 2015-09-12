/// <reference path="../../client/Client.ts" />
/// <reference path="./IClient.ts" />
/// <reference path="./IOptions.ts" />
/// <reference path="../Exception.ts" />
/// <reference path="../../../types/node/node.d.ts" />
/// <reference path="../../deferred.ts" />
/// <reference path="../../typeOf" />
/// <reference path="../../../types/log4js/log4js.d.ts" />
/// <reference path="../../../logger" />
/// <reference path="../../helpers/WebRootDirectoryHelper.ts" />
/// <reference path="../../helpers/IWebRootDirectoryHelper.ts" />
/// <reference path="../../helpers/MemoryLocationHelper.ts" />
/// <reference path="../../helpers/SourcesDirectoryHelper.ts" />
/// <reference path="../../helpers/ISourcesDirectoryHelper.ts" />
/// <reference path="../../helpers/IResourceLocation.ts" />
/// <reference path="../../helpers/ICssErrorsHelper.ts" />
/// <reference path="../../helpers/CssErrorsHelper.ts" />
/// <reference path="../../helpers/ICacheHelper.ts" />
/// <reference path="../../helpers/CacheHelper.ts" />

import typeOf = require("../../typeOf");
import deferred = require("../../deferred");
import WrapperException = require("../../WrapperException");
import WebRootDirectoryHelper = require("../../helpers/WebRootDirectoryHelper");
import IWebRootDirectoryHelper = require("../../helpers/IWebRootDirectoryHelper");
import MemoryLocationHelper = require("../../helpers/MemoryLocationHelper");
import IMemoryLocationHelper = require("../../helpers/IMemoryLocationHelper");
import SourcesDirectoryHelper = require("../../helpers/SourcesDirectoryHelper");
import ISourcesDirectoryHelper = require("../../helpers/ISourcesDirectoryHelper");
import IResourceLocation = require("../../helpers/IResourceLocation");
import CssErrorsHelper = require("../../helpers/CssErrorsHelper");
import ICssErrorsHelper = require("../../helpers/ICssErrorsHelper");
import CacheHelper = require("../../helpers/CacheHelper");
import ICacheHelper = require("../../helpers/ICacheHelper");
import BaseClient = require("../../client/Client");
import IOptions = require("./IOptions");
import Exception = require("../Exception");
import IClient = require("./IClient");
import IResponse = require("./IResponse");
import IRequest = require("./IRequest");
import cp = require("child_process");
import log4js = require("log4js");

require("../../../logger");

var logger:log4js.Logger = log4js.getLogger("worker");

class Client extends BaseClient implements IClient {

    private _cache:ICacheHelper = new CacheHelper();

    private _cssErrors:ICssErrorsHelper = new CssErrorsHelper();

    private _memoryLocation:IMemoryLocationHelper = new MemoryLocationHelper();

    private _sourcesDirectory:ISourcesDirectoryHelper = new SourcesDirectoryHelper();

    private _webRootDirectory:IWebRootDirectoryHelper = new WebRootDirectoryHelper();

    constructor(options:IOptions) {
        super(options);
        if (options && typeOf(options.sourcesDirectory) !== "undefined") {
            this.setSourcesDirectory(options.sourcesDirectory);
        }
        if (options && typeOf(options.memoryLocation) !== "undefined") {
            this.setMemoryLocation(options.memoryLocation);
        }
        if (options && typeOf(options.useCache) !== "undefined") {
            this.getCache().setIsUsed(options.useCache);
        }
        if (options && typeOf(options.errorBackgroundColor) !== "undefined") {
            this.getCssErrors().setBackgroundColor(options.errorBackgroundColor);
        }
        if (options && typeOf(options.errorTextColor) !== "undefined") {
            this.getCssErrors().setTextColor(options.errorTextColor);
        }
        if (options && typeOf(options.errorBlockPadding) !== "undefined") {
            this.getCssErrors().setBlockPadding(options.errorBlockPadding);
        }
        if (options && typeOf(options.errorFontSize) !== "undefined") {
            this.getCssErrors().setFontSize(options.errorFontSize);
        }
        if (options && typeOf(options.webRootDirectory) !== "undefined") {
            this.getWebRootDirectory().setLocation(options.webRootDirectory);
        }
    }

    protected getDaemon():string {
        return null;
    }

    protected getRequest():IRequest {
        return <IRequest>{
            filename: null,
            sourcesDirectory: this.getSourcesDirectory(),
            errorBackgroundColor: this.getCssErrors().getBackgroundColor(),
            errorTextColor: this.getCssErrors().getTextColor(),
            errorBlockPadding: this.getCssErrors().getBlockPadding(),
            errorFontSize: this.getCssErrors().getFontSize(),
            webRootDirectory: this.getWebRootDirectory().getLocation(),
            useCache: this.getCache().isUsed()
        };
    }

    protected getCache():ICacheHelper {
        return this._cache;
    }

    protected getCssErrors():ICssErrorsHelper {
        return this._cssErrors;
    }

    public getMemoryLocation():string {
        return this._memoryLocation.getLocation();
    }

    public setMemoryLocation(value:string):void {
        this._memoryLocation.setLocation(value);
    }

    protected getSourcesDirectory():string {
        return this._sourcesDirectory.getLocation();
    }

    protected setSourcesDirectory(value:string):void {
        this._sourcesDirectory.setLocation(value);
    }

    protected getWebRootDirectory():IResourceLocation {
        return this._webRootDirectory;
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

    public connect(callback:(errors?:Error[]) => void):void {
        deferred([
            (next:() => void):void => {
                var command:cp.ChildProcess = cp.spawn(process.execPath, [
                        this.getDaemon(),
                        "--location", this.getMeLocation().getLocation(),
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
                        data = Buffer.concat([data, buffer]);
                        string = buffer.toString("utf8");
                        index = string.indexOf("\n");
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
                                result = JSON.parse(json) || {
                                    started: false,
                                    errors: [{message: "Unknown error"}]
                                };
                            } catch (err) {
                                logger.warn("Worker send error content", data.toString("utf8"));
                                process.stderr.write(data);
                                result = {
                                    started: false,
                                    errors: [WrapperException.convertToObject(err)]
                                };
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

    public disconnect(callback:(errors?:Error[]) => void):void {
        // todo: implement this
    }


}

export = Client;

