import IBaseOptions = require("../../cssPreProcessorAbstract/manager/IOptions");

interface IOptions extends IBaseOptions {
    includeDirectories?: string[];
}

export = IOptions;
