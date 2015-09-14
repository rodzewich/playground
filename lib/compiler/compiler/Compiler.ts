/// <reference path="../../../types/node/node.d.ts" />

import IOptions = require("./IOptions");
import ICompiler = require("./ICompiler");
import typeOf = require("../../typeOf");
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
        if (options && typeOf(options.filename) !== "undefined") {
            this.setFilename(options.filename);
        }
        if (options && typeOf(options.sourcesDirectory) !== "undefined") {
            this.setSourcesDirectory(options.sourcesDirectory);
        }
        if (options && typeOf(options.memory) !== "undefined") {
            this.setMemory(options.memory);
        }
        if (options && typeOf(options.errorBackgroundColor) !== "undefined") {
            this.setCssErrorsBackgroundColor(options.errorBackgroundColor);
        }
        if (options && typeOf(options.errorTextColor) !== "undefined") {
            this.setCssErrorsTextColor(options.errorTextColor);
        }
        if (options && typeOf(options.errorBlockPadding) !== "undefined") {
            this.setCssErrorsBlockPadding(options.errorBlockPadding);
        }
        if (options && typeOf(options.errorFontSize) !== "undefined") {
            this.setCssErrorsFontSize(options.errorFontSize);
        }
        if (options && typeOf(options.useCache) !== "undefined") {
            this.setIsCacheUsed(options.useCache);
        }
        if (options && typeOf(options.webRootDirectory) !== "undefined") {
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
