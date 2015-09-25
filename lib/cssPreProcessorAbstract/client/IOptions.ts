import IBaseOptions = require("../../compiler/client/IOptions");

interface IOptions extends IBaseOptions {
    includeDirectories?:string[];
    brandSpecificLogic?:boolean;
    supportLanguages?:boolean;
}

export = IOptions;
