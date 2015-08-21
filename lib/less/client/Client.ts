/// <reference path="./IOptions.ts" />
/// <reference path="./IClient.ts" />
/// <reference path="../../compiler/client/Client.ts" />
/// <reference path="../../../types/node/node.d.ts" />
/// <reference path="./IResponse.ts" />
/// <reference path="./IRequest.ts" />
/// <reference path="../../typeOf.ts" />

import typeOf = require("../../typeOf");
import IOptions = require("./IOptions");
import IClient = require("./IClient");
import AbstractClient = require("../../compiler/client/Client");
import IResponse = require("./IResponse");
import IRequest = require("./IRequest");
import path = require("path");

class Client extends AbstractClient {

    constructor(options:IOptions) {
        super(options);
        if (options && typeOf(options.includeDirectories) !== "undefined") {
            this.setIncludeDirectories(options.includeDirectories);
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
    }

    private _includeDirectories:string[] = [];

    protected getIncludeDirectories(): string[] {
        return this._includeDirectories;
    }

    protected setIncludeDirectories(value: string[]): void {
        this._includeDirectories = value;
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

    protected getDaemon(): string {
        return path.join(__dirname, "../daemon.js");
    }

    protected getRequest():IRequest {
        return <IRequest>{
            filename: null,
            sourcesDirectory: this.getSourcesDirectory(),
            includeDirectories: this.getIncludeDirectories(),
            errorBackgroundColor: this.getErrorBackgroundColor(),
            errorTextColor: this.getErrorTextColor(),
            errorBlockPadding: this.getErrorBlockPadding(),
            errorFontSize: this.getErrorFontSize()
        };
    }

    public compile(filename:string, callback?:(errors?:Error[], result?:IResponse) => void):void {
        super.compile(filename, (errors?:Error[], result?:any):void => {
            if (typeOf(callback) === "function") {
                callback(errors, <IResponse>result);
            }
        });
    }

}

export = Client;
