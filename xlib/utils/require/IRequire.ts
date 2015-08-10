/// <reference path="../../core.ts" />
/// <reference path="../loader/factory/IFactory.ts" />

import core = require("../../core");
import ILoaderFactory = require("../loader/factory/IFactory");

interface IRequire extends core.IUsedFactory<ILoaderFactory> {
    load(files:any[], callback?:(errors?:Error[]) => void): void;
}

export = IRequire;
