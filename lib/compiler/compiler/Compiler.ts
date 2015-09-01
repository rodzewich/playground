/// <reference path="./IOptions.ts" />
/// <reference path="./ICompiler.ts" />
/// <reference path="../../typeOf.ts" />
/// <reference path="../../../types/node/node.d.ts" />
/// <reference path="../../memory/client/IClient.ts" />
/// <reference path="../../Exception.ts" />
/// <reference path="../../helpers/CssErrorsHelper.ts" />
/// <reference path="../../helpers/ICssErrorsHelper.ts" />
/// <reference path="../../helpers/SourcesDirectoryHelper.ts" />
/// <reference path="../../helpers/ISourcesDirectoryHelper.ts" />
/// <reference path="../../helpers/ICacheHelper.ts" />
/// <reference path="../../helpers/CacheHelper.ts" />

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

class Compiler implements ICompiler {

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
            this.getSourcesDirectory().setLocation(options.sourcesDirectory);
        }
        if (options && typeOf(options.memory) !== "undefined") {
            this.setMemory(options.memory);
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
        if (options && typeOf(options.useCache) !== "undefined") {
            this.getCache().setUse(options.useCache);
        }
        if (options && typeOf(options.webRootDirectory) !== "undefined") {
            this.getWebRootDirectory().setLocation(options.webRootDirectory);
        }
    }

    public getCache():ICacheHelper {
        return this._cache;
    }

    public getSourcesDirectory():ISourcesDirectoryHelper {
        return this._sourcesDirectory;
    }

    public getWebRootDirectory(): IWebRootDirectoryHelper {
        return this._webRootDirectory;
    }

    public getCssErrors():ICssErrorsHelper {
        return this._cssErrors;
    }

    public setMemory(value:IMemory):void {
        this._memory = value;
    }

    public getMemory():IMemory {
        return this._memory;
    }

    public getFilename():string {
        return this._filename;
    }

    public setFilename(value:string):void {
        this._filename = value;
    }

    public compile(callback:(errors?:Error[], result?:any) => void):void {
        setTimeout(():void => {
            if (typeOf(callback) === "function") {
                callback(null, null);
            }
        }, 0).ref();
    }

}

export = Compiler;
