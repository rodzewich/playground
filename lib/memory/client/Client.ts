/// <reference path="./IClient.ts" />
/// <reference path="./IOptions.ts" />
/// <reference path="../../client/Client.ts" />

import IClient = require("./IClient");
import IOptions = require("./IOptions");
import AbstractClient = require("../../client/Client");

// todo: 1. добавить логирование!
// todo: 2. дописать дисконект
// todo: 3. дописать постоянные соединения через pool
// todo: 4. дописать hasNamespace, getNamespaces, removeNamespace
// todo: 5. сделать пинг
// todo: 6. implement smart connect (чтобы само соединялось, если не соеденено)

class Client extends AbstractClient implements IClient {

    private _namespace:string = "default";

    constructor(options:IOptions) {
        super(options);
        if (options && typeof options.namespace !== "undefined") {
            this.setNamespace(options.namespace);
        }
    }

    protected setNamespace(value:string):void {
        this._namespace = String(value);
    }

    protected getNamespace():string {
        return this._namespace;
    }

    public getItem(key:string, callback:(error?:Error, response?:any) => void):void {
        // todo: проверять входящие параметры
        this.call((error?:Error, response?:any):void => {
            callback(error || null, response || null);
        }, this.getNamespace(), "getItem", key);
    }

    public getItems(keys:string[], callback:(error?:Error, response?:any) => void):void {
        // todo: проверять входящие параметры
        this.call((error?:Error, response?:any):void => {
            callback(error || null, <any>response || null);
        }, this.getNamespace(), "getItems", keys);
    }

    public setItem(key:string, value:any, callback:(error?:Error) => void):void {
        // todo: проверять входящие параметры
        this.call((error?:Error, response?:any):void => {
            callback(error || null);
        }, this.getNamespace(), "setItem", key, value);
    }

    public setItems(data:any, callback:(error?:Error) => void):void {
        // todo: проверять входящие параметры
        this.call((error?:Error, response?:any):void => {
            callback(error || null);
        }, this.getNamespace(), "setItems", data);
    }

    public removeItem(key:string, callback:(error?:Error) => void):void {
        // todo: проверять входящие параметры
        this.call((error?:Error, response?:any):void => {
            callback(error || null);
        }, this.getNamespace(), "removeItem", key);
    }

    public removeItems(keys:string[], callback:(error?:Error) => void) {
        // todo: проверять входящие параметры
        this.call((error?:Error, response?:any):void => {
            callback(error || null);
        }, this.getNamespace(), "removeItems", keys);
    }

    public hasItem(key:string, callback:(error?:Error, response?:boolean) => void):void {
        // todo: проверять входящие параметры
        this.call((error?:Error, response?:any):void => {
            callback(error || null, error ? null : !!response);
        }, this.getNamespace(), "hasItem", key);
    }

    public hasItems(keys:string[], callback:(error?:Error, response?:any) => void):void {
        // todo: проверять входящие параметры
        this.call((error?:Error, response?:any):void => {
            callback(error || null, response || null);
        }, this.getNamespace(), "hasItems", keys);
    }

    public getKey(index:number, callback:(error?:Error, response?:string) => void):void {
        // todo: проверять входящие параметры
        this.call((error?:Error, response?:any):void => {
            callback(error || null, <string>response || null);
        }, this.getNamespace(), "getKey", index);
    }

    public getKeys(indexes:number[], callback:(error?:Error, response?:string[]) => void):void {
        // todo: проверять входящие параметры
        this.call((error?:Error, response?:any):void => {
            callback(error || null, <string[]>response || null);
        }, this.getNamespace(), "getKeys", indexes);
    }

    public getLength(callback:(error?:Error, response?:number) => void):void {
        // todo: проверять входящие параметры
        this.call((error?:Error, response?:any):void => {
            callback(error || null, <number>response || null);
        }, this.getNamespace(), "getLength");
    }

    public lock(key:string, callback:(error?:Error, unlock?:(callback:(error?:Error) => void) => void) => void):void {
        // todo: проверять входящие параметры
        var unlock:(callback:(error?:Error) => void) => void = (callback:(error?:Error) => void):void => {
            this.call((error?:Error, response?:any):void => {
                callback(error || null);
            }, this.getNamespace(), "unlock", key);
        };
        this.call((error?:Error, response?:any):void => {
            callback(error || null, error ? null : unlock);
        }, this.getNamespace(), "lock", key);
    }

}

export = Client;
