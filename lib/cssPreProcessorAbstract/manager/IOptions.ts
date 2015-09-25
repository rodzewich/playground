import IBaseOptions = require("../../compiler/manager/IOptions");

interface IOptions extends IBaseOptions {
    includeDirectories?:string[];
    brandSpecificLogic?:boolean;
    supportLanguages?:boolean;
}

export = IOptions;
