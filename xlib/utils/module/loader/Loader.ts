/// <reference path="./ILoader.ts" />
/// <reference path="../builder/IBuilder.ts" />
/// <reference path="../transport/ITransport.ts" />

import IBuilder = require("../builder/IBuilder");
import ITransport = require("../transport/ITransport");
import ILoader = require("./ILoader");

class Loader implements ILoader {

    protected _builder:IBuilder;

    protected _transport:ITransport;

    public setBuilder(value:IBuilder):void {
        this._builder = value;
    }

    public getBuilder():IBuilder {
        return this._builder;
    }

    public setTransport(value:ITransport):void {
        this._transport = value;
    }

    public getTransport():ITransport {
        return this._transport;
    }

    public load(filename:string, callback:(error?:Error) => void):void {
        this.getTransport().load(this.getBuilder().transform(filename), callback);
    }

}

export = Loader;