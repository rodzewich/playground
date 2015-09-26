import IBaseOptions = require("../../compiler/compiler/IOptions");
import IMemory = require("../../memory/client/IClient");

interface IOptions extends IBaseOptions {
    includeDirectories?:string[];
    brandSpecificLogic?:boolean;
    supportLanguages?:boolean;
    throwErrors?:boolean;
    usedPostProcessing?:boolean;
    memory?:IMemory;
}

export = IOptions;
