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
    }

    private _includeDirectories:string[] = [];

    protected getIncludeDirectories(): string[] {
        return this._includeDirectories;
    }

    protected setIncludeDirectories(value: string[]): void {
        this._includeDirectories = value;
    }

    protected createClient(location:string):IClient {
        return new Client({
            location: location,
            memoryLocation: this.getMemoryLocation(),
            sourcesDirectory: this.getSourcesDirectory(),
            useCache: this.isUseCache(),
            includeDirectories: this.getIncludeDirectories(),
            errorBackgroundColor: this.getErrorBackgroundColor(),
            errorTextColor: this.getErrorTextColor(),
            errorBlockPadding: this.getErrorBlockPadding(),
            webRootDirectory: this.getWebRootDirectory(),
            errorFontSize: this.getErrorFontSize()
        });
    }

}

export = Manager;
