import IBaseOptions = require("../../compiler/compiler/IOptions");
import IMemory = require("../../memory/client/IClient");

interface IOptions extends IBaseOptions {
    includeDirectories?:string[];
    memory?:IMemory;
}

export = IOptions;
