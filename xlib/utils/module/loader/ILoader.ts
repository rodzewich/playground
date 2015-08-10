/// <reference path="../builder/IBuilder.ts" />
/// <reference path="../transport/ITransport.ts" />

import IBuilder = require("../builder/IBuilder");
import ITransport = require("../transport/ITransport");

interface ILoader {
    setBuilder(value:IBuilder): void;
    getBuilder(): IBuilder;
    setTransport(value:ITransport): void;
    getTransport(): ITransport;
    load(filename:string, callback:(error?:Error) => void): void;
}

export = ILoader;
