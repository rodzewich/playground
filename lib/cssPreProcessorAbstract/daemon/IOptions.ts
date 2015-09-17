import IBaseOptions = require("../../compiler/daemon/IOptions");

interface IOptions extends IBaseOptions {
    memory:IMemory;
}

export = IOptions;
