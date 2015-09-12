import IBaseOptions = require("../../daemon/IOptions");
import IMemory = require("../../memory/client/IClient");

interface IOptions extends IBaseOptions {
    memory: IMemory;
}

export = IOptions;
