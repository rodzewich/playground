/// <reference path="../../../types/node/node.d.ts" />

import typeOf = require("../../typeOf");
import IOptions = require("./IOptions");
import BaseClient = require("../../compiler/client/Client");
import IResponse = require("./IResponse");
import IRequest = require("./IRequest");
import IIncludeDirectoriesHelper = require("../../helpers/IIncludeDirectoriesHelper");
import IncludeDirectoriesHelper = require("../../helpers/IncludeDirectoriesHelper");

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
        this._includeDirectories.setDirectories(value);
    }

    protected getRequest():IRequest {
        return <IRequest>{
            filename             : null,
            sourcesDirectory     : this.getSourcesDirectory(),
            includeDirectories   : this.getIncludeDirectories(),
            errorBackgroundColor : this.getCssErrorsBackgroundColor(),
            errorTextColor       : this.getCssErrorsTextColor(),
            errorBlockPadding    : this.getCssErrorsBlockPadding(),
            errorFontSize        : this.getCssErrorsFontSize(),
            webRootDirectory     : this.getWebRootDirectory(),
            useCache             : this.isCacheUsed()
        };
    }

    public compile(filename:string, callback?:(errors:Error[], result:IResponse) => void):void {
        super.compile(filename, (errors:Error[], result:any):void => {
            if (typeOf(callback) === "function") {
                callback(errors, <IResponse>result);
            }
        });
    }

}

export = Client;
