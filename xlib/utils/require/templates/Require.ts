/// <reference path="./IRequire.ts" />
/// <reference path="../Require.ts" />

import IRequire = require("./IRequire");
import AbstractRequire = require("../Require");

class Require extends AbstractRequire implements IRequire {
    load(files:any[], callback?:(errors?:Error[]) => void):void {
        this.getFactory().getTemplatesLoader().load(files, callback);
    }
}

export = Require;
