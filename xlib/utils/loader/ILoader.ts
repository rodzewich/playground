/// <reference path="./IUsedTransport.ts" />

import IUsedTransport = require("./IUsedTransport");

interface ILoader extends IUsedTransport {
    load(files:any[], callback?:(errors?:Error[]) => void): void;
}

export = ILoader;
