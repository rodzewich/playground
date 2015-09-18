import IManager = require("./IManager");
import IOptions = require("./IOptions");
import BaseManager = require("../../compiler/manager/Manager");
import IClient = require("../client/IClient");
import Client = require("../client/Client");
import IClientOptions = require("../client/IOptions");
import typeOf = require("../../typeOf");
import IIncludeDirectoriesHelper = require("../../helpers/IIncludeDirectoriesHelper");
import IncludeDirectoriesHelper = require("../../helpers/IncludeDirectoriesHelper");

class Manager extends BaseManager {

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

    protected createClient(location:string):IClient {
        return new Client(this.createOptions(location));
    }

    protected createOptions(location:string): IClientOptions {
        return {
            location             : location,
            memoryLocation       : this.getMemoryLocation(),
            sourcesDirectory     : this.getSourcesDirectory(),
            useCache             : this.isCacheUsed(),
            includeDirectories   : this.getIncludeDirectories(),
            errorBackgroundColor : this.getCssErrorsBackgroundColor(),
            errorTextColor       : this.getCssErrorsTextColor(),
            errorBlockPadding    : this.getCssErrorsBlockPadding(),
            errorFontSize        : this.getCssErrorsFontSize(),
            webRootDirectory     : this.getWebRootDirectory()
        };
    }

}

export = Manager;
