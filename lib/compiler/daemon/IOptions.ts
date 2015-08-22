/// <reference path="../../daemon/IOptions.ts" />
/// <reference path="../../memory/client/IClient" />

import IBaseOptions = require("../../daemon/IOptions");
import IMemory = require("../../memory/client/IClient");

interface IOptions extends IBaseOptions {
    memory: IMemory;
}

export = IOptions;
