import IOptionsBase = require("../../compiler/compiler/IOptions");
import IMemory = require("../../memory/client/IClient");

interface IOptions extends IOptionsBase {
    includeDirectories?:string[];
    brandSpecificLogic?:boolean;
    supportLanguages?:boolean;
    throwErrors?:boolean;
    usedPostProcessing?:boolean;
    memory?:IMemory;
}

export = IOptions;
