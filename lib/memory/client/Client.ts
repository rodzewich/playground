/// <reference path="./IClient.ts" />
/// <reference path="./IOptions.ts" />
/// <reference path="../../client/Client.ts" />

import IClient = require("./IClient");
import IOptions = require("./IOptions");
import BaseClient = require("../../client/Client");
import typeOf = require("../../typeOf");
import Exception = require("../Exception");

// todo: 1. добавить логирование!
// todo: 2. дописать дисконект
// todo: 3. дописать постоянные соединения через pool
// todo: 4. дописать hasNamespace, getNamespaces, removeNamespace
// todo: 5. сделать пинг
// todo: 6. implement smart connect (чтобы само соединялось, если не соеденено)

class Client extends BaseClient implements IClient {

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
            var temp:Error[] = null,
                result:any = null;
            if (errors && errors.length) {
                temp = errors;
            } else {
                result = response || null
            }
            callback(temp, result);
        }, this.getNamespace(), "getItem", key);
    }

    public getItems(keys:string[], callback:(errors?:Error[], response?:any) => void):void {
        // todo: проверять входящие параметры
        this.call((errors?:Error[], response?:any):void => {
            var temp:Error[] = null,
                result:any = null;
            if (errors && errors.length) {
                temp = errors;
            } else {
                result = response || null
            }
            callback(temp, result);
        }, this.getNamespace(), "getItems", keys);
    }

    public setItem(key:string, value:any, callback:(errors?:Error[]) => void):void {
        // todo: проверять входящие параметры
        this.call((errors?:Error[], response?:any):void => {
            var temp:Error[] = null;
            if (errors && errors.length) {
                temp = errors;
            }
            callback(temp);
        }, this.getNamespace(), "setItem", key, value);
    }

    public setItems(data:any, callback:(errors?:Error[]) => void):void {
        // todo: проверять входящие параметры
        this.call((errors?:Error[], response?:any):void => {
            var temp:Error[] = null;
            if (errors && errors.length) {
                temp = errors;
            }
            callback(temp);
        }, this.getNamespace(), "setItems", data);
    }

    public removeItem(key:string, callback:(errors?:Error[]) => void):void {
        // todo: проверять входящие параметры
        this.call((errors?:Error[], response?:any):void => {
            var temp:Error[] = null;
            if (errors && errors.length) {
                temp = errors;
            }
            callback(temp);
        }, this.getNamespace(), "removeItem", key);
    }

    public removeItems(keys:string[], callback:(errors?:Error[]) => void) {
        // todo: проверять входящие параметры
        this.call((errors?:Error[], response?:any):void => {
            var temp:Error[] = null;
            if (errors && errors.length) {
                temp = errors;
            }
            callback(temp);
        }, this.getNamespace(), "removeItems", keys);
    }

    public hasItem(key:string, callback:(errors?:Error[], response?:boolean) => void):void {
        // todo: проверять входящие параметры
        this.call((errors?:Error[], response?:any):void => {
            var temp:Error[] = null,
                result:boolean = null;
            if (errors && errors.length) {
                temp = errors;
            } else {
                result = !!<boolean>response;
            }
            callback(temp, result);
        }, this.getNamespace(), "hasItem", key);
    }

    public hasItems(keys:string[], callback:(errors?:Error[], response?:any) => void):void {
        // todo: проверять входящие параметры
        this.call((errors?:Error[], response?:any):void => {
            var temp:Error[] = null,
                result:any = null;
            if (errors && errors.length) {
                temp = errors;
            } else {
                result = response || null;
            }
            callback(temp, result);
        }, this.getNamespace(), "hasItems", keys);
    }

    public getKey(index:number, callback:(errors?:Error[], response?:string) => void):void {
        // todo: проверять входящие параметры
        this.call((errors?:Error[], response?:any):void => {
            var temp:Error[] = null,
                result:string = null;
            if (errors && errors.length) {
                temp = errors;
            } else {
                result = String(<string>response || "");
            }
            callback(temp, result);
        }, this.getNamespace(), "getKey", index);
    }

    public getKeys(indexes:number[], callback:(errors?:Error[], response?:string[]) => void):void {
        // todo: проверять входящие параметры
        this.call((errors?:Error[], response?:any):void => {
            var temp:Error[] = null,
                result:string[] = null;
            if (errors && errors.length) {
                temp = errors;
            } else {
                result = <string[]>response || null;
                if (typeOf(result) !== "array" && typeOf(result) !== null) {
                    result = [];
                } else if (typeOf(result) === "array") {
                    result = result.map((element:any):string => {
                        return String(element || "");
                    });
                }
            }
            callback(temp, result);
        }, this.getNamespace(), "getKeys", indexes);
    }

    public getLength(callback:(errors?:Error[], response?:number) => void):void {
        // todo: проверять входящие параметры
        this.call((errors?:Error[], response?:any):void => {
            var temp:Error[] = null,
                result:number = null;
            if (errors && errors.length) {
                temp = errors;
            } else {
                result = Math.max(0, parseInt(String(<any>response), 10) || 0);
            }
            callback(temp, result);
        }, this.getNamespace(), "getLength");
    }

    public lock(key:string, callback:(errors?:Error[], unlock?:(callback:(errors?:Error[]) => void) => void) => void):void {
        var unlock:(callback:(errors?:Error[]) => void) => void = (callback:(errors?:Error[]) => void):void => {
            this.call((errors?:Error[], response?:any):void => {
                var temp:Error[] = null;
                if (errors && errors.length) {
                    temp = errors;
                }
                callback(temp);
            }, this.getNamespace(), "unlock", key);
        };
        if (typeOf(key) !== "string") {
            throw new Exception("bla bla bla");
        }
        this.call((errors?:Error[], response?:any):void => {
            var temp:Error[] = null;
            if (errors && errors.length) {
                temp = errors;
            }
            callback(temp, unlock);
        }, this.getNamespace(), "lock", key);
    }

}

export = Client;
