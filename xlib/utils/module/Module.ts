/// <reference path="./IModule.ts" />
/// <reference path="./builder/IBuilder.ts" />
/// <reference path="./transport/ITransport.ts" />

import IBuilder = require("./builder/IBuilder");
import ITransport = require("./transport/ITransport");
import IModule = require("./IModule");

class Module implements IModule {

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

export = Module;