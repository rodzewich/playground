/// <reference path="../../../types/node/node.d.ts" />

import {isFunction} from "../../utils/common";
import IOptions   = require("./IOptions");
import IClient    = require("./IClient");
import ClientBase = require("../../css/client/Client");
import IResponse  = require("./IResponse");
import IRequest   = require("./IRequest");
import path       = require("path");

class Client extends ClientBase {

    constructor(options:IOptions) {
        super(options);
    }

    protected getDaemon():string {
        return path.join(__dirname, "../daemon.js");
    }

    protected getRequest():IRequest {
        return <IRequest>{
            filename: null,
            sourcesDirectory: this.getSourcesDirectory(),
            includeDirectories: this.getIncludeDirectories(),
            errorBackgroundColor: this.getCssErrorsBackgroundColor(),
            errorTextColor: this.getCssErrorsTextColor(),
            errorBlockPadding: this.getCssErrorsBlockPadding(),
            errorFontSize: this.getCssErrorsFontSize(),
            webRootDirectory: this.getWebRootDirectory(),
            useCache: this.isCacheUsed()
        };
    }

    public compile(filename:string, callback?:(errors:Error[], result:IResponse) => void):void {
        super.compile(filename, (errors:Error[], result:any):void => {
            if (isFunction(callback)) {
                callback(errors, <IResponse>result);
            }
        });
    }

}

export = Client;
