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
import ISassLocationHelper = require("../../helpers/ISassLocationHelper");
import SassLocationHelper = require("../../helpers/SassLocationHelper");
import ICompassLocationHelper = require("../../helpers/ICompassLocationHelper");
import CompassLocationHelper = require("../../helpers/CompassLocationHelper");

class Client extends BaseClient {

    private _includeDirectories:IIncludeDirectoriesHelper = new IncludeDirectoriesHelper();

    private _sassLocation:ISassLocationHelper = new SassLocationHelper();

    private _compassLocation:ICompassLocationHelper = new CompassLocationHelper();

    constructor(options:IOptions) {
        super(options);
        if (options && typeOf(options.includeDirectories) !== "undefined") {
            this.getIncludeDirectories().setDirectories(options.includeDirectories);
        }
        if (options && typeOf(options.sassLocation) !== "undefined") {
            this.getSassLocation().setLocation(options.sassLocation);
        }
        if (options && typeOf(options.compassLocation) !== "undefined") {
            this.getCompassLocation().setLocation(options.compassLocation);
        }
    }

    protected getIncludeDirectories():IIncludeDirectoriesHelper {
        return this._includeDirectories;
    }

    protected getSassLocation():ISassLocationHelper {
        return this._sassLocation;
    }

    protected getCompassLocation():ICompassLocationHelper {
        return this._compassLocation;
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
            useCache: this.getCache().isUsed()
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
