import IOptionsBase = require("../../compiler/manager/IOptions");

interface IOptions extends IOptionsBase {
    includeDirectories?:string[];
    brandSpecificLogic?:boolean;
    supportLanguages?:boolean;
    throwErrors?:boolean;
    usedPostProcessing?:boolean;
}

export = IOptions;
