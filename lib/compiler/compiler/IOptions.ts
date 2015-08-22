/// <reference path="../../memory/client/IClient.ts" />

import IMemory = require("../../memory/client/IClient");

interface IOptions {
    filename: string;
    sourcesDirectory: string;
    memory?: IMemory;
}

export = IOptions;
