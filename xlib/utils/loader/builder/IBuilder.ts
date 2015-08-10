/// <reference path="./IUsedSeparator.ts" />
/// <reference path="./IUsedBase.ts" />

import IUsedSeparator = require("./IUsedSeparator");
import IUsedBase = require("./IUsedBase");

interface IBuilder extends IUsedSeparator, IUsedBase {
    route(path:string): string; // todo remove to IRouter
    transform(filename:string): string; // todo remove to ITransformer
    build(filename:string): string;
}

export = IBuilder;
