/// <reference path="transport/ITransport.ts" />

import ITransport = require("./transport/ITransport");

interface IOptions {
    transport?: ITransport;
}

export = IOptions;
