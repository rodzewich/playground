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
import ISassCompilerTypeHelper = require("../../helpers/ISassCompilerTypeHelper");
import SassCompilerTypeHelper = require("../../helpers/SassCompilerTypeHelper");
import ITemporaryDirectoryLocationHelper = require("../../helpers/ITemporaryDirectoryLocationHelper");
import TemporaryDirectoryLocationHelper = require("../../helpers/TemporaryDirectoryLocationHelper");
import CompilerType = require("../compiler/Type");

class Client extends BaseClient {

    private _includeDirectories:IIncludeDirectoriesHelper = new IncludeDirectoriesHelper();

    private _sassLocation:ISassLocationHelper = new SassLocationHelper();

    private _temporaryDirectoryLocation:ITemporaryDirectoryLocationHelper = new TemporaryDirectoryLocationHelper();

    private _compilerType:ISassCompilerTypeHelper<CompilerType> = new SassCompilerTypeHelper<CompilerType>();

    constructor(options:IOptions) {
        super(options);
        if (options && typeOf(options.includeDirectories) !== "undefined") {
            this.getIncludeDirectories().setDirectories(options.includeDirectories);
        }
        if (options && typeOf(options.sassLocation) !== "undefined") {
            this.getSassLocation().setLocation(options.sassLocation);
        } else {
            this.getSassLocation().setLocation("/usr/local/bin/sass");
        }
        if (options && typeOf(options.temporaryDirectory) !== "undefined") {
            this.getTemporaryDirectoryLocation().setLocation(options.temporaryDirectory);
        } else {
            this.getTemporaryDirectoryLocation().setLocation("/var/tmp");
        }
        if (options && typeOf(options.compilerType) !== "undefined" &&
            CompilerType.equal(CompilerType.NATIVE_SASS, options.compilerType)) {
            this.getCompilerType().setType(CompilerType.NATIVE_SASS);
        } else if (options && typeOf(options.compilerType) !== "undefined" &&
            CompilerType.equal(CompilerType.NODE_SASS, options.compilerType)) {
            this.getCompilerType().setType(CompilerType.NODE_SASS);
        } else if (options && typeOf(options.compilerType) !== "undefined" &&
            CompilerType.equal(CompilerType.COMPASS, options.compilerType)) {
            this.getCompilerType().setType(CompilerType.COMPASS);
        } else {
            this.getCompilerType().setType(CompilerType.NODE_SASS);
        }
    }

    protected getIncludeDirectories():IIncludeDirectoriesHelper {
        return this._includeDirectories;
    }

    protected getSassLocation():ISassLocationHelper {
        return this._sassLocation;
    }

    protected getTemporaryDirectoryLocation():ITemporaryDirectoryLocationHelper {
        return this._temporaryDirectoryLocation;
    }

    protected getCompilerType():ISassCompilerTypeHelper<CompilerType> {
        return this._compilerType;
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
            compilerType: this.getCompilerType().getType().toString(),
            sassLocation: this.getSassLocation().getLocation(),
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
