/// <reference path="./IOptions.ts" />
/// <reference path="./ICompiler.ts" />
/// <reference path="../../typeOf.ts" />
/// <reference path="../../../types/node/node.d.ts" />
/// <reference path="../../memory/client/IClient.ts" />
/// <reference path="../../Exception.ts" />

import IOptions = require("./IOptions");
import ICompiler = require("./ICompiler");
import typeOf = require("../../typeOf");
import IMemory = require("../../memory/client/IClient");
import Exception = require("../../Exception");

class Compiler implements ICompiler {

    private _memory:IMemory;

    private _filename:string;

    private _sourcesDirectory:string;

    private _errorBackgroundColor:string = "#ffff00";

    private _errorTextColor:string = "#000000";

    private _errorBlockPadding:string = "10px";

    private _errorFontSize:string = "13px";

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
        if (options && typeOf(options.useCache) !== "undefined") {
            this.setUseCache(options.useCache);
        }
        if (options && typeOf(options.webRootDirectory) !== "undefined") {
            this.setWebRootDirectory(options.webRootDirectory);
        }
    }

    private _webRootDirectory: string = "";

    protected getWebRootDirectory(): string {
        return this._webRootDirectory;
    }

    protected setWebRootDirectory(value: string): void {
        this._webRootDirectory = value;
    }

    private _useCache:boolean;

    protected setUseCache(value:boolean):void {
        this._useCache = value;
    }

    protected getUseCache():boolean {
        return this._useCache;
    }

    protected isUseCache():boolean {
        return !!this._useCache;
    }

    protected setErrorBackgroundColor(value:string):void {
        this._errorBackgroundColor = value;
    }

    protected getErrorBackgroundColor():string {
        return this._errorBackgroundColor;
    }

    protected getErrorTextColor():string {
        return this._errorTextColor;
    }

    protected setErrorTextColor(value:string):void {
        this._errorTextColor = value;
    }

    protected getErrorBlockPadding():string {
        return this._errorBlockPadding;
    }

    protected setErrorBlockPadding(value:string):void {
        this._errorBlockPadding = value;
    }

    protected getErrorFontSize():string {
        return this._errorFontSize;
    }

    protected setErrorFontSize(value:string):void {
        this._errorFontSize = value;
    }

    public setMemory(value:IMemory):void {
        this._memory = value;
    }

    public getMemory():IMemory {
        return this._memory;
    }

    protected createCssErrors(errors:Error[]):string {
        var property:string,
            content:string[] = [],
            bodyBefore:any = {
                "margin": "0 !important",
                "overflow": "hidden !important",
                "display": "block !important",
                "padding": this.getErrorBlockPadding() + " !important",
                "color": this.getErrorTextColor() + " !important",
                "background-color": this.getErrorBackgroundColor() + " !important",
                "white-space": "pre !important",
                "font-family": "'Courier New',Courier,'Lucida Sans Typewriter','Lucida Typewriter',monospace !important",
                "font-size": this.getErrorFontSize() + " !important",
                "font-style": "normal !important",
                "font-variant": "normal !important",
                "font-weight": "400 !important",
                "word-wrap": "break-word !important",
                "content": JSON.stringify(errors.map(function (error:Error, index:number) {
                    return String(index + 1) + ". " + Exception.getStack(error);
                }).join("\n\n")).
                    replace(/\\n/g, "\\A ")/*.
                 replace(/&/g, '&amp;').
                 replace(/</g, '&lt;').
                 replace(/>/g, '&gt;').
                 replace(/"/g, '&quot;')*/ + " !important"
                // todo: доделать реализацию
            };
        for (property in bodyBefore) {
            if (bodyBefore.hasOwnProperty(property)) {
                content.push(property + ":" + bodyBefore[property] + ";");
            }
        }
        return "body:before{" + content.join("") + "}";
    }

    protected getFilename():string {
        return this._filename;
    }

    protected setFilename(value:string):void {
        this._filename = value;
    }

    protected setSourcesDirectory(value:string):void {
        this._sourcesDirectory = value;
    }

    protected getSourcesDirectory():string {
        return this._sourcesDirectory;
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
