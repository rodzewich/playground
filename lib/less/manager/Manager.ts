/// <reference path="./IManager.ts" />
/// <reference path="./IOptions.ts" />
/// <reference path="../client/IClient.ts" />
/// <reference path="../client/Client.ts" />
/// <reference path="../../compiler/manager/Manager.ts" />
/// <reference path="../../typeOf.ts" />

import IManager = require("./IManager");
import IOptions = require("./IOptions");
import BaseManager = require("../../compiler/manager/Manager");
import IClient = require("../client/IClient");
import Client = require("../client/Client");
import typeOf = require("../../typeOf");

class Manager extends BaseManager {

    constructor(options: IOptions) {
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

    protected createClient(location:string):IClient {
        return new Client({
            location: location,
            memoryLocation: this.getMemoryLocation(),
            sourcesDirectory: this.getSourcesDirectory(),
            includeDirectories: this.getIncludeDirectories(),
            errorBackgroundColor: this.getErrorBackgroundColor(),
            errorTextColor: this.getErrorTextColor(),
            errorBlockPadding: this.getErrorBlockPadding(),
            errorFontSize: this.getErrorFontSize()
        });
    }

}

export = Manager;
