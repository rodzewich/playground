/// <reference path="../client/IOptions.ts" />

import IClientOptions = require("../client/IOptions");

interface IOptions extends IClientOptions {
    numberOfProcesses: number;
}

export = IOptions;
