/// <reference path="../ITransport.ts" />

import IAbstractTransport = require("../ITransport");

interface ITransport extends IAbstractTransport {
    setDocument(value: Document): void;
    getDocument(): Document;
}

export = ITransport;
