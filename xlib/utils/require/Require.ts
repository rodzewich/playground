/// <reference path="../../core.ts" />
/// <reference path="./IRequire.ts" />
/// <reference path="../loader/factory/IFactory.ts" />

import core = require("../../core");
import IRequire = require("./IRequire");
import ILoaderFactory = require("../loader/factory/IFactory");

class Require implements IRequire {

    protected factory:ILoaderFactory;

    public setFactory(value:ILoaderFactory):void {
        this.factory = value;
    }

    public getFactory():ILoaderFactory {
        if (!this.factory) {
            throw new Error('bla bla bla');
        }
        return this.factory;
    }

    public load(files:any[], callback?:(errors?:Error[]) => void):void {
        throw new Error("bla bla bla");
    }

}

export = Require;
