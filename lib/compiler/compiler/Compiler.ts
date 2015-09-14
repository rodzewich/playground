/// <reference path="../../../types/node/node.d.ts" />

import IOptions = require("./IOptions");
import ICompiler = require("./ICompiler");
import isDefined = require("../../isDefined");
import IMemory = require("../../memory/client/IClient");
import Exception = require("../../Exception");
import CssErrorsHelper = require("../../helpers/CssErrorsHelper");
import ICssErrorsHelper = require("../../helpers/ICssErrorsHelper");
import WebRootDirectoryHelper = require("../../helpers/WebRootDirectoryHelper");
import IWebRootDirectoryHelper = require("../../helpers/IWebRootDirectoryHelper");
import CacheHelper = require("../../helpers/CacheHelper");
import ICacheHelper = require("../../helpers/ICacheHelper");
import SourcesDirectoryHelper = require("../../helpers/SourcesDirectoryHelper");
import ISourcesDirectoryHelper = require("../../helpers/ISourcesDirectoryHelper");

abstract class Compiler implements ICompiler {

    private _memory:IMemory;

    private _filename:string;

    private _cache:ICacheHelper = new CacheHelper();

    private _webRootDirectory:IWebRootDirectoryHelper = new WebRootDirectoryHelper();

    private _cssErrors:ICssErrorsHelper = new CssErrorsHelper();

    private _sourcesDirectory:ISourcesDirectoryHelper = new SourcesDirectoryHelper();

    constructor(options?:IOptions) {
        if (options && isDefined(options.filename)) {
            this.setFilename(options.filename);
        }
        if (options && isDefined(options.sourcesDirectory)) {
            this.setSourcesDirectory(options.sourcesDirectory);
        }
        if (options && isDefined(options.memory)) {
            this.setMemory(options.memory);
        }
        if (options && isDefined(options.errorBackgroundColor)) {
            this.setCssErrorsBackgroundColor(options.errorBackgroundColor);
        }
        if (options && isDefined(options.errorTextColor)) {
            this.setCssErrorsTextColor(options.errorTextColor);
        }
        if (options && isDefined(options.errorBlockPadding)) {
            this.setCssErrorsBlockPadding(options.errorBlockPadding);
        }
        if (options && isDefined(options.errorFontSize)) {
            this.setCssErrorsFontSize(options.errorFontSize);
        }
        if (options && isDefined(options.useCache)) {
            this.setIsCacheUsed(options.useCache);
        }
        if (options && isDefined(options.webRootDirectory)) {
            this.setWebRootDirectory(options.webRootDirectory);
        }
    }

    protected isCacheUsed():boolean {
        return this._cache.isUsed();
    }

    protected getIsCacheUsed():boolean {
        return this._cache.getIsUsed();
    }

    protected setIsCacheUsed(value:boolean):void {
        return this._cache.setIsUsed(value);
    }

    protected getSourcesDirectory():string {
        return this._sourcesDirectory.getLocation();
    }

    protected setSourcesDirectory(value:string):void {
        this._sourcesDirectory.setLocation(value);
    }

    protected getWebRootDirectory():string {
        return this._webRootDirectory.getLocation();
    }

    protected setWebRootDirectory(value:string):void {
        this._webRootDirectory.setLocation(value);
    }

    protected getCssErrorsBackgroundColor():string {
        return this._cssErrors.getBackgroundColor();
    }

    protected setCssErrorsBackgroundColor(value:string):void {
        this._cssErrors.setBackgroundColor(value);
    }

    protected getCssErrorsTextColor():string {
        return this._cssErrors.getTextColor();
    }

    protected setCssErrorsTextColor(value:string):void {
        this._cssErrors.setTextColor(value);
    }

    protected getCssErrorsBlockPadding():string {
        return this._cssErrors.getBlockPadding();
    }

    protected setCssErrorsBlockPadding(value:string):void {
        this._cssErrors.setBlockPadding(value);
    }

    protected getCssErrorsFontSize():string {
        return this._cssErrors.getFontSize();
    }

    protected setCssErrorsFontSize(value:string):void {
        return this._cssErrors.setFontSize(value);
    }

    protected createCssErrors(errors:Error[]):string {
        return this._cssErrors.create(errors)
    }

    public setMemory(value:IMemory):void {
        this._memory = value;
    }

    public getMemory():IMemory {
        return this._memory;
    }

    protected getFilename():string {
        return this._filename;
    }

    protected setFilename(value:string):void {
        this._filename = value;
    }

    abstract compile(callback:(errors:Error[], result:any) => void):void;

}

export = Compiler;
