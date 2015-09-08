/// <reference path="./IManager.ts" />
/// <reference path="./IOptions.ts" />
/// <reference path="../client/IClient.ts" />
/// <reference path="../client/Client.ts" />
/// <reference path="../../compiler/manager/Manager.ts" />
/// <reference path="../../typeOf.ts" />
/// <reference path="../../helpers/IIncludeDirectoriesHelper.ts" />
/// <reference path="../../helpers/IncludeDirectoriesHelper.ts" />

import IManager = require("./IManager");
import IOptions = require("./IOptions");
import BaseManager = require("../../compiler/manager/Manager");
import IClient = require("../client/IClient");
import Client = require("../client/Client");
import typeOf = require("../../typeOf");
import IIncludeDirectoriesHelper = require("../../helpers/IIncludeDirectoriesHelper");
import IncludeDirectoriesHelper = require("../../helpers/IncludeDirectoriesHelper");
import ISassLocationHelper = require("../../helpers/ISassLocationHelper");
import SassLocationHelper = require("../../helpers/SassLocationHelper");
import ICompassLocationHelper = require("../../helpers/ICompassLocationHelper");
import CompassLocationHelper = require("../../helpers/CompassLocationHelper");
import ISassCompilerTypeHelper = require("../../helpers/ISassCompilerTypeHelper");
import SassCompilerTypeHelper = require("../../helpers/SassCompilerTypeHelper");
import ITemporaryDirectoryLocationHelper = require("../../helpers/ITemporaryDirectoryLocationHelper");
import TemporaryDirectoryLocationHelper = require("../../helpers/TemporaryDirectoryLocationHelper");
import CompilerType = require("../compiler/Type");

class Manager extends BaseManager {

    private _includeDirectories:IIncludeDirectoriesHelper = new IncludeDirectoriesHelper();

    private _sassLocation:ISassLocationHelper = new SassLocationHelper();

    private _compassLocation:ICompassLocationHelper = new CompassLocationHelper();

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
        if (options && typeOf(options.compassLocation) !== "undefined") {
            this.getCompassLocation().setLocation(options.compassLocation);
        } else {
            this.getCompassLocation().setLocation("/usr/local/bin/compass");
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

    protected getCompassLocation():ICompassLocationHelper {
        return this._compassLocation;
    }

    protected getTemporaryDirectoryLocation():ITemporaryDirectoryLocationHelper {
        return this._temporaryDirectoryLocation;
    }

    protected getCompilerType():ISassCompilerTypeHelper<CompilerType> {
        return this._compilerType;
    }

    protected createClient(location:string):IClient {
        return new Client({
            location: location,
            memoryLocation: this.getMemoryLocation().getLocation(),
            sourcesDirectory: this.getSourcesDirectory().getLocation(),
            useCache: this.getCache().isUsed(),
            includeDirectories: this.getIncludeDirectories().getDirectories(),
            errorBackgroundColor: this.getCssErrors().getBackgroundColor(),
            errorTextColor: this.getCssErrors().getTextColor(),
            errorBlockPadding: this.getCssErrors().getBlockPadding(),
            errorFontSize: this.getCssErrors().getFontSize(),
            webRootDirectory: this.getWebRootDirectory().getLocation(),
            compilerType: this.getCompilerType().getType().toString(),
            sassLocation: this.getSassLocation().getLocation(),
            compassLocation: this.getCompassLocation().getLocation(),
            temporaryDirectory: this.getTemporaryDirectoryLocation().getLocation()
        });
    }

}

export = Manager;
