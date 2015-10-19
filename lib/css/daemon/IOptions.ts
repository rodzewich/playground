import IOptionsBase = require("../../compiler/daemon/IOptions");
import IMemory = require("../../memory/client/IClient");

interface IOptions extends IOptionsBase {
    memory:IMemory;
}

export = IOptions;
