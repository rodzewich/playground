/// <reference path="transport/ITransport.ts" />

import ITransport = require("./transport/ITransport");

interface IUsedTransport {
    getTransport(): ITransport;
    setTransport(value:ITransport): void;
}

export = IUsedTransport;
