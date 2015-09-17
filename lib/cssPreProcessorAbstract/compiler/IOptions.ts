import IBaseOptions = require("../../compiler/compiler/IOptions");

interface IOptions extends IBaseOptions {
    includeDirectories?: string[];
    memory?: IMemory;
}

export = IOptions;
