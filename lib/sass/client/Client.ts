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
import ITemporaryDirectoryLocationHelper = require("../../helpers/ITemporaryDirectoryLocationHelper");
import TemporaryDirectoryLocationHelper = require("../../helpers/TemporaryDirectoryLocationHelper");

class Client extends BaseClient {

    private _includeDirectories:IIncludeDirectoriesHelper = new IncludeDirectoriesHelper();

    private _temporaryDirectoryLocation:ITemporaryDirectoryLocationHelper = new TemporaryDirectoryLocationHelper();

    constructor(options:IOptions) {
        super(options);
        if (options && typeOf(options.includeDirectories) !== "undefined") {
            this.getIncludeDirectories().setDirectories(options.includeDirectories);
        }
        if (options && typeOf(options.temporaryDirectory) !== "undefined") {
            this.getTemporaryDirectoryLocation().setLocation(options.temporaryDirectory);
        } else {
            this.getTemporaryDirectoryLocation().setLocation("/var/tmp");
        }
    }

    protected getIncludeDirectories():IIncludeDirectoriesHelper {
        return this._includeDirectories;
    }

    protected getTemporaryDirectoryLocation():ITemporaryDirectoryLocationHelper {
        return this._temporaryDirectoryLocation;
    }

    protected getDaemon():string {
        return path.join(__dirname, "../daemon.js");
    }

    protected getRequest():IRequest {
        return <IRequest>{
            filename: null,
            sourcesDirectory: this.getSourcesDirectory().getLocation(),
            includeDirectories: this.getIncludeDirectories().getDirectories(),
            errorBackgroundColor: this.getCssErrors().getBackgroundColor(),
            errorTextColor: this.getCssErrors().getTextColor(),
            errorBlockPadding: this.getCssErrors().getBlockPadding(),
            errorFontSize: this.getCssErrors().getFontSize(),
            webRootDirectory: this.getWebRootDirectory().getLocation(),
            useCache: this.getCache().isUsed(),
            temporaryDirectory: this.getTemporaryDirectoryLocation().getLocation()
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
