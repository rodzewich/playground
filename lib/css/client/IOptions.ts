import IOptionsBase = require("../../compiler/client/IOptions");

interface IOptions extends IOptionsBase {
    includeDirectories?:string[];
    brandSpecificLogic?:boolean;
    supportLanguages?:boolean;
    throwErrors?:boolean;
    usedPostProcessing?:boolean;
}

export = IOptions;
