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

    public getItem(key:string, callback:(errors?:Error[], response?:any) => void):void {
        // todo: проверять входящие параметры
        this.call((errors?:Error[], response?:any):void => {
            callback(errors || null, response || null);
        }, this.getNamespace(), "getItem", key);
    }

    public getItems(keys:string[], callback:(errors?:Error[], response?:any) => void):void {
        // todo: проверять входящие параметры
        this.call((errors?:Error[], response?:any):void => {
            callback(errors || null, <any>response || null);
        }, this.getNamespace(), "getItems", keys);
    }

    public setItem(key:string, value:any, callback:(errors?:Error[]) => void):void {
        // todo: проверять входящие параметры
        this.call((errors?:Error[], response?:any):void => {
            callback(errors || null);
        }, this.getNamespace(), "setItem", key, value);
    }

    public setItems(data:any, callback:(errors?:Error[]) => void):void {
        // todo: проверять входящие параметры
        this.call((errors?:Error[], response?:any):void => {
            callback(errors || null);
        }, this.getNamespace(), "setItems", data);
    }

    public removeItem(key:string, callback:(errors?:Error[]) => void):void {
        // todo: проверять входящие параметры
        this.call((errors?:Error[], response?:any):void => {
            callback(errors || null);
        }, this.getNamespace(), "removeItem", key);
    }

    public removeItems(keys:string[], callback:(errors?:Error[]) => void) {
        // todo: проверять входящие параметры
        this.call((errors?:Error[], response?:any):void => {
            callback(errors || null);
        }, this.getNamespace(), "removeItems", keys);
    }

    public hasItem(key:string, callback:(errors?:Error[], response?:boolean) => void):void {
        // todo: проверять входящие параметры
        this.call((errors?:Error[], response?:any):void => {
            callback(errors || null, errors ? null : !!response);
        }, this.getNamespace(), "hasItem", key);
    }

    public hasItems(keys:string[], callback:(errors?:Error[], response?:any) => void):void {
        // todo: проверять входящие параметры
        this.call((errors?:Error[], response?:any):void => {
            callback(errors || null, response || null);
        }, this.getNamespace(), "hasItems", keys);
    }

    public getKey(index:number, callback:(errors?:Error[], response?:string) => void):void {
        // todo: проверять входящие параметры
        this.call((errors?:Error[], response?:any):void => {
            callback(errors || null, <string>response || null);
        }, this.getNamespace(), "getKey", index);
    }

    public getKeys(indexes:number[], callback:(errors?:Error[], response?:string[]) => void):void {
        // todo: проверять входящие параметры
        this.call((errors?:Error[], response?:any):void => {
            callback(errors || null, <string[]>response || null);
        }, this.getNamespace(), "getKeys", indexes);
    }

    public getLength(callback:(errors?:Error[], response?:number) => void):void {
        // todo: проверять входящие параметры
        this.call((errors?:Error[], response?:any):void => {
            callback(errors || null, <number>response || null);
        }, this.getNamespace(), "getLength");
    }

    public lock(key:string, callback:(errors?:Error[], unlock?:(callback:(errors?:Error[]) => void) => void) => void):void {
        // todo: проверять входящие параметры
        var unlock:(callback:(errors?:Error[]) => void) => void = (callback:(errors?:Error[]) => void):void => {
            this.call((errors?:Error[], response?:any):void => {
                callback(errors || null);
            }, this.getNamespace(), "unlock", key);
        };
        this.call((errors?:Error[], response?:any):void => {
            callback(errors || null, errors ? null : unlock);
        }, this.getNamespace(), "lock", key);
    }

}

export = Client;
