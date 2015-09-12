/// <reference path="./IOptions.ts" />
/// <reference path="./IClient.ts" />
/// <reference path="../../compiler/client/Client.ts" />
/// <reference path="../../../types/node/node.d.ts" />
/// <reference path="./IResponse.ts" />
/// <reference path="./IRequest.ts" />
/// <reference path="../../typeOf.ts" />
/// <reference path="../../helpers/IIncludeDirectoriesHelper.ts" />
/// <reference path="../../helpers/IncludeDirectoriesHelper.ts" />

import typeOf = require("../../typeOf");
import IOptions = require("./IOptions");
import IClient = require("./IClient");
import BaseClient = require("../../compiler/client/Client");
import IResponse = require("./IResponse");
import IRequest = require("./IRequest");
import path = require("path");
import IIncludeDirectoriesHelper = require("../../helpers/IIncludeDirectoriesHelper");
import IncludeDirectoriesHelper = require("../../helpers/IncludeDirectoriesHelper");

// todo использовать http://lesscss.org/usage/#plugins-list-of-less-plugins
// todo использовать https://github.com/less/less-plugin-clean-css
// todo использовать https://github.com/less/less-plugin-inline-urls
// todo использовать https://github.com/less/less-plugin-npm-import
// todo использовать https://www.npmjs.com/browse/keyword/less%20plugins

class Client extends BaseClient {

    private _includeDirectories:IIncludeDirectoriesHelper = new IncludeDirectoriesHelper();

    constructor(options:IOptions) {
        super(options);
        if (options && typeOf(options.includeDirectories) !== "undefined") {
            this.setIncludeDirectories(options.includeDirectories);
        }
    }

    protected getIncludeDirectories():string[] {
        return this._includeDirectories.getDirectories();
    }

    protected setIncludeDirectories(value:string[]):void {
        this._includeDirectories.setDirectories(value)
    }

    protected getDaemon():string {
        return path.join(__dirname, "../daemon.js");
    }

    protected getRequest():IRequest {
        return <IRequest>{
            filename: null,
            sourcesDirectory: this.getSourcesDirectory(),
            includeDirectories: this.getIncludeDirectories(),
            errorBackgroundColor: this.getCssErrors().getBackgroundColor(),
            errorTextColor: this.getCssErrors().getTextColor(),
            errorBlockPadding: this.getCssErrors().getBlockPadding(),
            errorFontSize: this.getCssErrors().getFontSize(),
            webRootDirectory: this.getWebRootDirectory(),
            useCache: this.isCacheUsed()
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
