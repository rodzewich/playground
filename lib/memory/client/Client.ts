import IClient        = require("./IClient");
import IOptions       = require("./IOptions");
import BaseClient     = require("../../client/Client");
import typeOf         = require("../../typeOf");
import isFunction      = require("../../isFunction");
import Exception      = require("../exception/Exception");
import IException      = require("../exception/IException");
import NamespaceHelper  = require("../../helpers/NamespaceHelper");
import INamespaceHelper = require("../../helpers/INamespaceHelper");

// todo: 1. добавить логирование!
// todo: 2. дописать дисконект
// todo: 3. дописать постоянные соединения через pool
// todo: 4. дописать hasNamespace, getNamespaces, removeNamespace
// todo: 5. сделать пинг
// todo: 6. implement smart connect (чтобы само соединялось, если не соеденено)

class Client extends BaseClient implements IClient {

    private _namespaceHelper:INamespaceHelper;

    protected createNamespaceHelper():INamespaceHelper {
        return new NamespaceHelper("default");
    }

    protected getNamespaceHelper():INamespaceHelper {
        if (!this._namespaceHelper) {
            this._namespaceHelper = this.createNamespaceHelper();
        }
        return this._namespaceHelper;
    }

    public getNamespace():string {
        return this.getNamespaceHelper().getValue();
    }

    public setNamespace(value:string):void {
        this.getNamespaceHelper().setValue(value);
    }

    public get namespace():string {
        return this.getNamespace();
    }

    public set namespace(value:string) {
        return this.setNamespace(value);
    }

    constructor(options:IOptions) {
        super(options);
        if (options && typeof options.namespace !== "undefined") {
            this.setNamespace(options.namespace);
        }
    }

    public getItem(key:string, callback?:(errors:IException[], response:any) => void):void {
        function handler(errors:IException[], response:any):void {
            if (isFunction(callback)) {
                callback(errors, response);
            }
        }
        if (typeOf(key) !== "string") {
            handler([new Exception({message : "key should be a string"})], null);
        } else {
            this.call((errors:IException[], response:any):void => {
                var errs:IException[] = null,
                    result:any = null;
                if (errors && errors.length) {
                    errs = errors;
                } else {
                    result = response || null
                }
                handler(errs, result);
            }, this.getNamespace(), "getItem", key);
        }
    }

    public getItems(keys:string[], callback?:(errors:IException[], response:any) => void):void {
        // todo: проверять входящие параметры
        this.call((errors:IException[], response:any):void => {
            var errs:IException[] = null,
                result:any = null;
            if (errors && errors.length) {
                errs = errors;
            } else {
                result = response || null
            }
            callback(errs, result);
        }, this.getNamespace(), "getItems", keys);
    }

    public setItem(key:string, value:any, callback?:(errors:IException[]) => void):void {
        function handler(errors:IException[], response:any):void {
            if (isFunction(callback)) {
                callback(errors, response);
            }
        }
        if (typeOf(key) !== "string") {
            handler([new Exception({message : "key should be a string"})], null);
        } else {
            this.call((errors:IException[], response:any):void => {
                var errs:IException[] = null;
                if (errors && errors.length) {
                    errs = errors;
                }
                callback(errs);
            }, this.getNamespace(), "setItem", key, value);
        }
    }

    public setItems(data:any, callback?:(errors:IException[]) => void):void {
        // todo: проверять входящие параметры
        this.call((errors:IException[], response:any):void => {
            var errs:IException[] = null;
            if (errors && errors.length) {
                errs = errors;
            }
            callback(errs);
        }, this.getNamespace(), "setItems", data);
    }

    public removeItem(key:string, callback?:(errors:IException[]) => void):void {
        function handler(errors:IException[], response:any):void {
            if (isFunction(callback)) {
                callback(errors, response);
            }
        }
        if (typeOf(key) !== "string") {
            handler([new Exception({message : "key should be a string"})], null);
        } else {
            this.call((errors:IException[], response:any):void => {
                var errs:IException[] = null;
                if (errors && errors.length) {
                    errs = errors;
                }
                callback(errs);
            }, this.getNamespace(), "removeItem", key);
        }
    }

    public removeItems(keys:string[], callback?:(errors:IException[]) => void) {
        // todo: проверять входящие параметры
        this.call((errors:IException[], response:any):void => {
            var errs:IException[] = null;
            if (errors && errors.length) {
                errs = errors;
            }
            callback(errs);
        }, this.getNamespace(), "removeItems", keys);
    }

    public hasItem(key:string, callback?:(errors:IException[], response:boolean) => void):void {
        function handler(errors:IException[], response:any):void {
            if (isFunction(callback)) {
                callback(errors, response);
            }
        }
        if (typeOf(key) !== "string") {
            handler([new Exception({message : "key should be a string"})], null);
        } else {
            this.call((errors:IException[], response:any):void => {
                var errs:IException[] = null,
                    result:boolean    = null;
                if (errors && errors.length) {
                    errs = errors;
                } else {
                    result = !!<boolean>response;
                }
                callback(errs, result);
            }, this.getNamespace(), "hasItem", key);
        }
    }

    public hasItems(keys:string[], callback?:(errors:IException[], response:any) => void):void {
        // todo: проверять входящие параметры
        this.call((errors:IException[], response:any):void => {
            var errs:IException[] = null,
                result:any = null;
            if (errors && errors.length) {
                errs = errors;
            } else {
                result = response || null;
            }
            callback(errs, result);
        }, this.getNamespace(), "hasItems", keys);
    }

    public getKey(index:number, callback?:(errors:IException[], response:string) => void):void {
        // todo: проверять входящие параметры
        this.call((errors:IException[], response:any):void => {
            var errs:IException[] = null,
                result:string = null;
            if (errors && errors.length) {
                errs = errors;
            } else {
                result = String(<string>response || "");
            }
            callback(errs, result);
        }, this.getNamespace(), "getKey", index);
    }

    public getKeys(indexes:number[], callback?:(errors:IException[], response:string[]) => void):void {
        // todo: проверять входящие параметры
        this.call((errors:IException[], response:any):void => {
            var errs:IException[] = null,
                result:string[] = null;
            if (errors && errors.length) {
                errs = errors;
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
            callback(errs, result);
        }, this.getNamespace(), "getKeys", indexes);
    }

    public getLength(callback?:(errors:IException[], response:number) => void):void {
        this.call((errors:IException[], response:any):void => {
            var errs:IException[] = null,
                result:number = null;
            if (errors && errors.length) {
                errs = errors;
            } else {
                result = Math.max(0, parseInt(String(<any>response), 10) || 0);
            }
            callback(errs, result);
        }, this.getNamespace(), "getLength");
    }

    public lock(key:string, callback?:(errors:IException[], unlock:(callback?:(errors:IException[]) => void) => void) => void):void {
        function handler(errors:IException[], response:any):void {
            if (isFunction(callback)) {
                callback(errors, response);
            }
        }
        var unlock:(callback?:(errors:IException[]) => void) => void = (callback?:(errors:IException[]) => void):void => {
            function handler(errors:IException[], response:any):void {
                if (isFunction(callback)) {
                    callback(errors, response);
                }
            }
            this.call((errors:IException[], response:any):void => {
                var errs:IException[] = null;
                if (errors && errors.length) {
                    errs = errors;
                }
                handler(errs);
            }, this.getNamespace(), "unlock", key);
        };
        if (typeOf(key) !== "string") {
            handler([new Exception({message : "key should be a string"})], null);
        } else {
            this.call((errors:IException[], response:any):void => {
                var errs:IException[] = null;
                if (errors && errors.length) {
                    errs = errors;
                }
                callback(errs, unlock);
            }, this.getNamespace(), "lock", key);
        }
    }

}

export = Client;
