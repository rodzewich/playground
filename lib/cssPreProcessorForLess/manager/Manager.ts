import IManager = require("./IManager");
import IOptions = require("./IOptions");
import BaseManager = require("../../cssPreProcessorAbstract/manager/Manager");
import IClient = require("../client/IClient");
import Client = require("../client/Client");
import typeOf = require("../../typeOf");

class Manager extends BaseManager {

    constructor(options:IOptions) {
        super(options);
        if (options && typeOf(options.includeDirectories) !== "undefined") {
            this.setIncludeDirectories(options.includeDirectories);
        }
    }

    protected createClient(location:string):IClient {
        return new Client({
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
        });
    }

}

export = Manager;
