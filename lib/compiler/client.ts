/// <reference path="../../types/node/node.d.ts" />
/// <reference path="../../types/log4js/log4js.d.ts" />

import cp = require("child_process");
import log4js = require("log4js");
import {IOptions as IOptionsBase, IClient as IClientBase, Client as ClientBase} from "../client";
import {isString, isFunction, isArray, isDefined, deferred} from "../utils/common";
import {IWebRootDirectoryHelper, WebRootDirectoryHelper} from "./helpers/webRootDirectoryHelper";
import {IMemoryLocationHelper, MemoryLocationHelper} from "./helpers/memoryLocationHelper";
import {ISourcesDirectoryHelper, SourcesDirectoryHelper} from "../helpers/sourcesDirectoryHelper";
import {ICssErrorsHelper, CssErrorsHelper} from "./helpers/cssErrorsHelper";
import {ICacheHelper, CacheHelper} from "./helpers/cacheHelper";
import {IException, Exception} from "./exception";
import {IException as IExceptionBase} from "../exception";

var logger:log4js.Logger = log4js.getLogger("worker");

export interface IOptions extends IOptionsBase {
    sourcesDirectory:string;
    memoryLocation:string;
    useCache:boolean;
    errorsBackgroundColor?:string;
    errorsTextColor?:string;
    errorsBlockPadding?:string;
    errorsFontSize?:string;
    webRootDirectory:string;
}

export interface IRequest {
    filename:string;
    sourcesDirectory:string;
    errorsBackgroundColor:string;
    errorsTextColor:string;
    errorsBlockPadding:string;
    errorsFontSize:string;
    webRootDirectory:string;
    useCache:boolean;
}

export interface IResponse {
}

export interface IClient extends IClientBase {
    daemon:string;
    useCache:boolean;
    errorsBackgroundColor:string;
    errorsTextColor:string;
    errorsBlockPadding:string;
    errorsFontSize:string;
    memoryLocation:string;
    sourcesDirectory:string;
    webRootDirectory:string;
    compile(filename:string, callback?:(errors:IException[], result:IResponse) => void): void;
    getDaemon():string;
    isCacheUsed():boolean;
    getIsCacheUsed():boolean;
    setIsCacheUsed(value:boolean):void;
    getErrorsBackgroundColor():string;
    setErrorsBackgroundColor(value:string):void;
    getErrorsTextColor():string;
    setErrorsTextColor(value:string):void;
    getErrorsBlockPadding():string;
    setErrorsBlockPadding(value:string):void;
    getErrorsFontSize():string;
    setErrorsFontSize(value:string):void;
    createCssErrors(errors:Error[]):string;
    getMemoryLocation():string;
    setMemoryLocation(value:string):void;
    getSourcesDirectory():string;
    setSourcesDirectory(value:string):void;
    getWebRootDirectory():string;
    setWebRootDirectory(value:string):void;
}

export class Client extends ClientBase implements IClient {

    private _cacheHelper:ICacheHelper;

    private _cssErrorsHelper:ICssErrorsHelper;

    private _memoryLocationHelper:IMemoryLocationHelper;

    private _sourcesDirectoryHelper:ISourcesDirectoryHelper;

    private _webRootDirectoryHelper:IWebRootDirectoryHelper;

    protected createCssErrorsHelper():ICssErrorsHelper {
        return new CssErrorsHelper();
    }

    protected createCacheHelper():ICacheHelper {
        return new CacheHelper();
    }

    protected getCacheHelper():ICacheHelper {
        if (!this._cacheHelper) {
            this._cacheHelper = this.createCacheHelper();
        }
        return this._cacheHelper;
    }

    protected getCssErrorsHelper():ICssErrorsHelper {
        if (!this._cssErrorsHelper) {
            this._cssErrorsHelper = this.createCssErrorsHelper();
        }
        return this._cssErrorsHelper;
    }

    protected createMemoryLocationHelper():IMemoryLocationHelper {
        return new MemoryLocationHelper();
    }

    protected getMemoryLocationHelper():IMemoryLocationHelper {
        if (!this._memoryLocationHelper) {
            this._memoryLocationHelper = this.createMemoryLocationHelper();
        }
        return this._memoryLocationHelper;
    }

    protected createSourcesDirectoryHelper():ISourcesDirectoryHelper {
        return new SourcesDirectoryHelper();
    }

    protected getSourcesDirectoryHelper():ISourcesDirectoryHelper {
        if (!this._sourcesDirectoryHelper) {
            this._sourcesDirectoryHelper = this.createSourcesDirectoryHelper();
        }
        return this._sourcesDirectoryHelper;
    }

    protected createWebRootDirectoryHelper():IWebRootDirectoryHelper {
        return new WebRootDirectoryHelper();
    }

    protected getWebRootDirectoryHelper():IWebRootDirectoryHelper {
        if (!this._webRootDirectoryHelper) {
            this._webRootDirectoryHelper = this.createWebRootDirectoryHelper();
        }
        return this._webRootDirectoryHelper;
    }

    constructor(options:IOptions) {
        super(options);
        if (options && isDefined(options.sourcesDirectory)) {
            this.setSourcesDirectory(options.sourcesDirectory);
        }
        if (options && isDefined(options.memoryLocation)) {
            this.setMemoryLocation(options.memoryLocation);
        }
        if (options && isDefined(options.useCache)) {
            this.setIsCacheUsed(options.useCache);
        }
        if (options && isDefined(options.errorsBackgroundColor)) {
            this.setErrorsBackgroundColor(options.errorsBackgroundColor);
        }
        if (options && isDefined(options.errorsTextColor)) {
            this.setErrorsTextColor(options.errorsTextColor);
        }
        if (options && isDefined(options.errorsBlockPadding)) {
            this.setErrorsBlockPadding(options.errorsBlockPadding);
        }
        if (options && isDefined(options.errorsFontSize)) {
            this.setErrorsFontSize(options.errorsFontSize);
        }
        if (options && isDefined(options.webRootDirectory)) {
            this.setWebRootDirectory(options.webRootDirectory);
        }
    }

    public get daemon():string {
        return this.getDaemon();
    }

    public getDaemon():string {
        return null;
    }

    public get useCache():boolean {
        return this.getIsCacheUsed();
    }

    public set useCache(value:boolean) {
        this.setIsCacheUsed(value);
    }

    public isCacheUsed():boolean {
        return this.getCacheHelper().isUsed();
    }

    public getIsCacheUsed():boolean {
        return this.getCacheHelper().getIsUsed();
    }

    public setIsCacheUsed(value:boolean):void {
        return this.getCacheHelper().setIsUsed(value);
    }

    public get errorsBackgroundColor():string {
        return this.getErrorsBackgroundColor();
    }

    public set errorsBackgroundColor(value:string) {
        this.setErrorsBackgroundColor(value);
    }

    public getErrorsBackgroundColor():string {
        return this.getCssErrorsHelper().getBackgroundColor();
    }

    public setErrorsBackgroundColor(value:string):void {
        this.getCssErrorsHelper().setBackgroundColor(value);
    }

    public get errorsTextColor():string {
        return this.getErrorsTextColor();
    }

    public set errorsTextColor(value:string) {
        this.setErrorsTextColor(value);
    }

    public getErrorsTextColor():string {
        return this.getCssErrorsHelper().getTextColor();
    }

    public setErrorsTextColor(value:string):void {
        this.getCssErrorsHelper().setTextColor(value);
    }

    public get errorsBlockPadding():string {
        return this.getErrorsBlockPadding();
    }

    public set errorsBlockPadding(value:string) {
        this.setErrorsBlockPadding(value);
    }

    public getErrorsBlockPadding():string {
        return this.getCssErrorsHelper().getBlockPadding();
    }

    public setErrorsBlockPadding(value:string):void {
        this.getCssErrorsHelper().setBlockPadding(value);
    }

    public get errorsFontSize():string {
        return this.getErrorsFontSize();
    }

    public set errorsFontSize(value:string) {
        this.setErrorsFontSize(value);
    }

    public getErrorsFontSize():string {
        return this.getCssErrorsHelper().getFontSize();
    }

    public setErrorsFontSize(value:string):void {
        return this.getCssErrorsHelper().setFontSize(value);
    }

    public createCssErrors(errors:Error[]):string {
        return this.getCssErrorsHelper().create(errors)
    }

    public get memoryLocation():string {
        return this.getMemoryLocation();
    }

    public set memoryLocation(value:string) {
        this.setMemoryLocation(value);
    }

    public getMemoryLocation():string {
        return this.getMemoryLocationHelper().getLocation();
    }

    public setMemoryLocation(value:string):void {
        this.getMemoryLocationHelper().setLocation(value);
    }

    public get sourcesDirectory():string {
        return this.getSourcesDirectory();
    }

    public set sourcesDirectory(value:string) {
        this.setSourcesDirectory(value);
    }

    public getSourcesDirectory():string {
        return this.getSourcesDirectoryHelper().getLocation();
    }

    public setSourcesDirectory(value:string):void {
        this.getSourcesDirectoryHelper().setLocation(value);
    }

    public get webRootDirectory():string {
        return this.getWebRootDirectory();
    }

    public set webRootDirectory(value:string) {
        this.setWebRootDirectory(value);
    }

    public getWebRootDirectory():string {
        return this.getWebRootDirectoryHelper().getLocation();
    }

    public setWebRootDirectory(value:string):void {
        this.getWebRootDirectoryHelper().setLocation(value)
    }

    protected createRequest(filename:string):IRequest {
        return <IRequest>{
            filename              : filename,
            sourcesDirectory      : this.getSourcesDirectory(),
            errorsBackgroundColor : this.getErrorsBackgroundColor(),
            errorsTextColor       : this.getErrorsTextColor(),
            errorsBlockPadding    : this.getErrorsBlockPadding(),
            errorsFontSize        : this.getErrorsFontSize(),
            webRootDirectory      : this.getWebRootDirectory(),
            useCache              : this.isCacheUsed()
        };
    }

    public compile(filename:string, callback?:(errors:IException[], result:IResponse) => void):void {

        function handler(errors:IException[], result:IResponse):void {
            if (isFunction(callback)) {
                callback(errors, result);
            }
        }

        if (!isString(filename)) {
            handler([new Exception({message: "filename should be a string"})]);
        } else {
            this.call((errors:IExceptionBase[], response?:any):void => {
                if (errors && errors.length) {
                    handler(errors.map((exception:IExceptionBase):IException => {
                        return new Exception({
                            name    : exception.getName(),
                            code    : exception.getCode(),
                            type    : exception.getType(),
                            message : exception.getMessage(),
                            stack   : exception.getStack(),
                            data    : exception.getData()
                        });
                    }), null);
                } else {
                    handler(null, <IResponse>response);
                }
            }, "compile", this.createRequest(filename));
        }

    }

    public connect(callback:(errors:Error[]) => void):void {
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
                                        errors: [new Exception({message: "unknown error"}).toObject()]
                                    };
                            } catch (err) {
                                logger.warn("Worker send error content", data.toString("utf8"));
                                process.stderr.write(data);
                                result = {
                                    started: false,
                                    errors: [new Exception({
                                        name: err.name,
                                        message: err.message,
                                        stack: err.stack,
                                        code: err.code
                                    }).toObject()]
                                };
                            }
                            data = data.slice((new Buffer(json, "utf8")).length + 1);
                            if (!result.started) {
                                if (isArray(result.errors)) {
                                    errors = (<any[]>result.errors).map((item:any):Error => {
                                        return new Exception(item);
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

    public disconnect(callback:(errors:Error[]) => void):void {
        super.disconnect
        // todo: implement this
    }


}
