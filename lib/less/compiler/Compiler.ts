/// <reference path="../../compiler/compiler/Compiler.ts" />
/// <reference path="./IOptions.ts" />
/// <reference path="./ICompiler.ts" />

import AbstractCompiler = require("../../compiler/compiler/Compiler");
import IOptions = require("./IOptions");
import ICompiler = require("./ICompiler");

class Compiler extends AbstractCompiler implements ICompiler {

    private _includeDirectories:string[];

    private _errorBackgroundColor:string = "#ffff00";

    private _errorTextColor:string = "#000000";

    private _errorBlockPadding:string = "10px";

    private _errorFontSize:string;

    constructor(options:IOptions) {
        super(options);
        if (options && options.includeDirectories) {
            this.setIncludeDirectories(options.includeDirectories);
        }
        if (options && options.errorBackgroundColor) {
            this.setErrorBackgroundColor(options.errorBackgroundColor);
        }
        if (options && options.errorTextColor) {
            this.setErrorTextColor(options.errorTextColor);
        }
        if (options && options.errorBlockPadding) {
            this.setErrorBlockPadding(options.errorBlockPadding);
        }
        if (options && options.errorFontSize) {
            this.setErrorFontSize(options.errorFontSize);
        }
    }

    protected getIncludeDirectories():string[] {
        return this._includeDirectories;
    }

    protected setIncludeDirectories(value:string[]):void {
        this._includeDirectories = value;
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

    public compile(callback:(errors?:Error[], result?:any) => void):void {
        setTimeout(():void => {
            if (typeOf(callback) === "function") {
                callback(null, null);
            }
        }, 0).ref();
    }


}

export = Compiler;