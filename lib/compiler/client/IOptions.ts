/// <reference path="../../client/IOptions.ts" />

import IBaseOptions = require("../../client/IOptions");

interface IOptions extends IBaseOptions {
    sourcesDirectory: string;
    memoryLocation: string;
}

export = IOptions;
