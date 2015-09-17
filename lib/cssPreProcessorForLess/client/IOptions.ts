import IBaseOptions = require("../../cssPreProcessorAbstract/client/IOptions");

interface IOptions extends IBaseOptions {
    includeDirectories?: string[];
}

export = IOptions;
