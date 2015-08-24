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
import BaseClient = require("../../compiler/client/Client");
import IResponse = require("./IResponse");
import IRequest = require("./IRequest");
import path = require("path");

class Client extends BaseClient {

    constructor(options:IOptions) {
        super(options);
        if (options && typeOf(options.includeDirectories) !== "undefined") {
            this.setIncludeDirectories(options.includeDirectories);
        }
    }

    private _includeDirectories:string[] = [];

    protected getIncludeDirectories(): string[] {
        return this._includeDirectories;
    }

    protected setIncludeDirectories(value: string[]): void {
        this._includeDirectories = value;
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
            errorFontSize: this.getErrorFontSize(),
            webRootDirectory: this.getWebRootDirectory(),
            useCache: this.isUseCache()
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
