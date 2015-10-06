/// <reference path="../../../types/node/node.d.ts" />
/// <reference path="../../../types/log4js/log4js.d.ts" />

import typeOf = require("../../typeOf");
import isDefined = require("../../isDefined");
import deferred = require("../../deferred");
import WebRootDirectoryHelper = require("../helpers/WebRootDirectoryHelper");
import IWebRootDirectoryHelper = require("../helpers/IWebRootDirectoryHelper");
import MemoryLocationHelper = require("../helpers/MemoryLocationHelper");
import IMemoryLocationHelper = require("../helpers/IMemoryLocationHelper");
import SourcesDirectoryHelper = require("../helpers/SourcesDirectoryHelper");
import ISourcesDirectoryHelper = require("../helpers/ISourcesDirectoryHelper");
import CssErrorsHelper = require("../helpers/CssErrorsHelper");
import ICssErrorsHelper = require("../helpers/ICssErrorsHelper");
import CacheHelper = require("../helpers/CacheHelper");
import ICacheHelper = require("../helpers/ICacheHelper");
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

    private _cacheHelper:ICacheHelper;

    protected createCacheHelperInstance():ICacheHelper {
        return new CacheHelper();
    }

    protected getCacheHelperInstance():ICacheHelper {
        if (!this._cacheHelper) {
            this._cacheHelper = this.createCacheHelperInstance();
        }
        return this._cacheHelper;
    }

    private _cssErrorsHelper:ICssErrorsHelper;

    protected createCssErrorsHelperInstance():ICssErrorsHelper {
        return new CssErrorsHelper();
    }

    protected getCssErrorsHelperInstance():ICssErrorsHelper {
        if (!this._cssErrorsHelper) {
            this._cssErrorsHelper = this.createCssErrorsHelperInstance();
        }
        return this._cssErrorsHelper;
    }

    private _memoryLocationHelper:IMemoryLocationHelper;

    protected createMemoryLocationHelper():IMemoryLocationHelper {
        return new MemoryLocationHelper();
    }

    protected getMemoryLocationHelper():IMemoryLocationHelper {
        if (!this._memoryLocationHelper) {
            this._memoryLocationHelper = this.createMemoryLocationHelper();
        }
        return this._memoryLocationHelper;
    }

    private _sourcesDirectoryHelper:ISourcesDirectoryHelper;

    protected createSourcesDirectoryHelper():ISourcesDirectoryHelper {
        return new SourcesDirectoryHelper();
    }

    protected getSourcesDirectoryHelper():ISourcesDirectoryHelper {
        if (!this._sourcesDirectoryHelper) {
            this._sourcesDirectoryHelper = this.createSourcesDirectoryHelper();
        }
        return this._sourcesDirectoryHelper;
    }

    private _webRootDirectoryHelper:IWebRootDirectoryHelper;

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
            this.setCssErrorsBackgroundColor(options.errorsBackgroundColor);
        }
        if (options && isDefined(options.errorsTextColor)) {
            this.setCssErrorsTextColor(options.errorsTextColor);
        }
        if (options && isDefined(options.errorsBlockPadding)) {
            this.setCssErrorsBlockPadding(options.errorsBlockPadding);
        }
        if (options && isDefined(options.errorsFontSize)) {
            this.setCssErrorsFontSize(options.errorsFontSize);
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
        return this.getCacheHelperInstance().isUsed();
    }

    public getIsCacheUsed():boolean {
        return this.getCacheHelperInstance().getIsUsed();
    }

    public setIsCacheUsed(value:boolean):void {
        return this.getCacheHelperInstance().setIsUsed(value);
    }

    public get cssErrorsBackgroundColor():string {
        return this.getCssErrorsBackgroundColor();
    }

    public getCssErrorsBackgroundColor():string {
        return this.getCssErrorsHelperInstance().getBackgroundColor();
    }

    public set cssErrorsBackgroundColor(value:string) {
        this.setCssErrorsBackgroundColor(value);
    }

    public setCssErrorsBackgroundColor(value:string):void {
        this.getCssErrorsHelperInstance().setBackgroundColor(value);
    }

    public get cssErrorsTextColor():string {
        return this.getCssErrorsTextColor();
    }

    public getCssErrorsTextColor():string {
        return this.getCssErrorsHelperInstance().getTextColor();
    }

    public set cssErrorsTextColor(value:string) {
        this.setCssErrorsTextColor(value);
    }

    public setCssErrorsTextColor(value:string):void {
        this.getCssErrorsHelperInstance().setTextColor(value);
    }

    public get cssErrorsBlockPadding():string {
        return this.getCssErrorsBlockPadding();
    }

    public getCssErrorsBlockPadding():string {
        return this.getCssErrorsHelperInstance().getBlockPadding();
    }

    public set cssErrorsBlockPadding(value:string) {
        this.setCssErrorsBlockPadding(value);
    }

    public setCssErrorsBlockPadding(value:string):void {
        this.getCssErrorsHelperInstance().setBlockPadding(value);
    }

    public get cssErrorsFontSize():string {
        return this.getCssErrorsFontSize();
    }

    public getCssErrorsFontSize():string {
        return this.getCssErrorsHelperInstance().getFontSize();
    }

    public set cssErrorsFontSize(value:string) {
        this.setCssErrorsFontSize(value);
    }

    public setCssErrorsFontSize(value:string):void {
        return this.getCssErrorsHelperInstance().setFontSize(value);
    }

    public createCssErrors(errors:Error[]):string {
        return this.getCssErrorsHelperInstance().create(errors)
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
            filename             : filename,
            sourcesDirectory     : this.getSourcesDirectory(),
            errorBackgroundColor : this.getCssErrorsBackgroundColor(),
            errorTextColor       : this.getCssErrorsTextColor(),
            errorBlockPadding    : this.getCssErrorsBlockPadding(),
            errorFontSize        : this.getCssErrorsFontSize(),
            webRootDirectory     : this.getWebRootDirectory(),
            useCache             : this.isCacheUsed()
        };
    }

    public compile(filename:string, callback?:(errors:Error[], result:IResponse) => void):void {
        if (typeOf(filename) !== "string") {
            throw new Exception("filename should be a string");
        }
        this.call((errors:Error[], response?:any):void => {
            var errs:Error[] = null,
                result:any = null;
            if (errors && errors.length) {
                errs = errors;
            } else {
                result = response || null;
            }
            if (typeOf(callback) === "function") {
                callback(errs, <IResponse>result);
            }
        }, "compile", this.createRequest(filename));
    }

    public connect(callback:(errors:Error[]) => void):void {
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

    public disconnect(callback:(errors:Error[]) => void):void {
        // todo: implement this
    }


}

export = Client;

