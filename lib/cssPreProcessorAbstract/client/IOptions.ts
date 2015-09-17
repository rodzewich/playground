import IBaseOptions = require("../../compiler/client/IOptions");

interface IOptions extends IBaseOptions {
    includeDirectories?: string[];
}

export = IOptions;
