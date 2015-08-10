/// <reference path="./IAction.ts" />

import IAction = require("./IAction");

interface IDeferred {
    add(...actions:IAction[]): IDeferred;
    run(complete?:(errors:Error[]) => void): void;
}

export = IDeferred;
