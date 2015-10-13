import IInformation     = require("../IInformation");
import isNull           = require("../../isNull");
import isDefined        = require("../../isDefined");
import isArray          = require("../../isArray");
import isString         = require("../../isString");
import isObject         = require("../../isObject");
import isNumber         = require("../../isNumber");
import isFunction       = require("../../isFunction");
import IClient          = require("./IClient");
import IOptions         = require("./IOptions");
import BaseClient       = require("../../client/Client");
import Exception        = require("../exception/Exception");
import IException       = require("../exception/IException");
import NamespaceHelper  = require("../../helpers/NamespaceHelper");
import INamespaceHelper = require("../../helpers/INamespaceHelper");
import log4js           = require("../../../logger");

// todo: 1. добавить логирование!
// todo: 3. дописать постоянные соединения через pool
// todo: 4. дописать hasNamespace, getNamespaces, removeNamespace
// todo: implement inc & dec

var logger:log4js.Logger = log4js.getLogger("memory");

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

    constructor(options:IOptions) {
        super(options);
        if (options && typeof options.namespace !== "undefined") {
            this.setNamespace(options.namespace);
        }
    }

    public getNamespace():string {
        return this.getNamespaceHelper().getValue();
    }

    public setNamespace(namespace:string):void {
        this.getNamespaceHelper().setValue(namespace);
    }

    public get namespace():string {
        return this.getNamespace();
    }

    public set namespace(namespace:string) {
        this.setNamespace(namespace);
    }

    public getInfo(callback?:(errors:IException[], response:IInformation) => void):void {
        // todo: implement it
    }

    public getNamespaces(callback?:(errors:IException[], response:string[]) => void):void {

        function handler(errors:IException[], response:string[]):void {
            if (isFunction(callback)) {
                setTimeout(():void => {
                    callback(errors, response);
                }, 0);
            }
            if (errors) {
                errors.forEach((error:IException):void => {
                    logger.error(error.getStack());
                });
            }
        }

        this.call((errors:IException[], response:string[]):void => {
            handler(errors && errors.length ? errors : null,
                !errors || !errors.length && response ? response : null);
        }, "getNamespaces");

    }

    public hasNamespace(namespace:string, callback?:(errors:IException[], response:boolean) => void):void {

        function handler(errors:IException[], response:boolean):void {
            if (isFunction(callback)) {
                setTimeout(():void => {
                    callback(errors, response);
                }, 0);
            }
            if (errors) {
                errors.forEach((error:IException):void => {
                    logger.error(error.getStack());
                });
            }
        }

        if (!isString(namespace)) {
            handler([new Exception({message : "namespace should be a string"})], null);
        } else {
            this.call((errors:IException[], response:boolean):void => {
                handler(errors && errors.length ? errors : null,
                    !errors || !errors.length ? !!response : null);
            }, "hasNamespace", namespace);
        }

    }

    public removeNamespace(namespace:string, callback?:(errors:IException[]) => void):void {
        // todo: implement it
    }

    public ping(callback?:(errors:IException[]) => void):void {

        function handler(errors:IException[]):void {
            if (isFunction(callback)) {
                setTimeout(():void => {
                    callback(errors);
                }, 0);
            }
            if (errors) {
                errors.forEach((error:IException):void => {
                    logger.error(error.getStack());
                });
            }
        }

        this.call((errors:IException[]):void => {
            handler(errors && errors.length ? errors : null);
        }, "ping");

    }

    public getItem(key:string, callback?:(errors:IException[], response:any) => void):void {

        function handler(errors:IException[], response:any):void {
            if (isFunction(callback)) {
                setTimeout(():void => {
                    callback(errors, response);
                }, 0);
            }
            if (errors) {
                errors.forEach((error:IException):void => {
                    logger.error(error.getStack());
                });
            }
        }

        if (!isString(key)) {
            handler([new Exception({message : "key should be a string"})], null);
        } else {
            this.call((errors:IException[], response:any):void => {
                handler(errors && errors.length ? errors : null,
                    !errors || !errors.length && isDefined(response) ? response : null);
            }, "getItem", this.getNamespace(), key);
        }

    }

    public getItems(keys:string[], callback?:(errors:IException[], response:{[index:string]:any;}|any) => void):void {

        function handler(errors:IException[], response:{[index:string]:any;}|any):void {
            if (isFunction(callback)) {
                setTimeout(():void => {
                    callback(errors, response);
                }, 0);
            }
            if (errors) {
                errors.forEach((error:IException):void => {
                    logger.error(error.getStack());
                });
            }
        }

        if (!isArray(keys) || !keys.length || keys.reduce((previous:boolean, element:string):boolean => {
                return previous && isString(element);
            }, true)) {
            handler([new Exception({message: "keys should be a non empty strings array"})], null);
        } else {
            this.call((errors:IException[], response:{[index:string]:any;}|any):void => {
                handler(errors && errors.length ? errors : null,
                    !errors || !errors.length && isDefined(response) ? response : null);
            }, "getItems", this.getNamespace(), keys);
        }

    }

    public setItem(key:string, value:any, callback?:(errors:IException[]) => void, ttl?:number):void {

        function handler(errors:IException[]):void {
            if (isFunction(callback)) {
                setTimeout(():void => {
                    callback(errors);
                }, 0);
            }
            if (errors) {
                errors.forEach((error:IException):void => {
                    logger.error(error.getStack());
                });
            }
        }

        if (!isString(key)) {
            handler([new Exception({message : "key should be a string"})]);
        } else if (isDefined(ttl) && !isNull(ttl) && (!isNumber(ttl) || isNaN(ttl) || ttl < 0)) {
            handler([new Exception({message : "ttl should be a positive integer"})]);
        } else {
            this.call((errors:IException[]):void => {
                handler(errors && errors.length ? errors : null);
            }, "setItem", this.getNamespace(), key, value, ttl ? Math.floor(ttl) : null);
        }

    }

    public setItems(data:{[index:string]:any;}|any, callback?:(errors:IException[]) => void, ttl?:number):void {

        function handler(errors:IException[]):void {
            if (isFunction(callback)) {
                setTimeout(():void => {
                    callback(errors);
                }, 0);
            }
            if (errors) {
                errors.forEach((error:IException):void => {
                    logger.error(error.getStack());
                });
            }
        }

        if (!isObject(data) || !Object.keys(data).length) {
            handler([new Exception({message : "data should be a non empty object"})]);
        } else if (isDefined(ttl) && !isNull(ttl) && (!isNumber(ttl) || isNaN(ttl) || ttl < 0)) {
            handler([new Exception({message : "ttl should be a positive integer"})]);
        } else {
            this.call((errors:IException[]):void => {
                handler(errors && errors.length ? errors : null);
            }, "setItems", this.getNamespace(), data, ttl ? Math.floor(ttl) : null);
        }

    }

    public getTtl(key:string, callback?:(errors:IException[], response:number) => void):void {

        function handler(errors:IException[], response:number):void {
            if (isFunction(callback)) {
                setTimeout(():void => {
                    callback(errors, response);
                }, 0);
            }
            if (errors) {
                errors.forEach((error:IException):void => {
                    logger.error(error.getStack());
                });
            }
        }

        if (!isString(key)) {
            handler([new Exception({message : "key should be a string"})], null);
        } else {
            this.call((errors:IException[], response:any):void => {
                handler(errors && errors.length ? errors : null,
                    !errors || !errors.length && isDefined(response) ? response : null);
            }, "getTtl", this.getNamespace(), key);
        }

    }

    public getTtls(keys:string[], callback?:(errors:IException[], response:{[index:string]:number;}|any) => void):void {

        function handler(errors:IException[], response:{[index:string]:number;}|any):void {
            if (isFunction(callback)) {
                setTimeout(():void => {
                    callback(errors, response);
                }, 0);
            }
            if (errors) {
                errors.forEach((error:IException):void => {
                    logger.error(error.getStack());
                });
            }
        }

        if (!isArray(keys) || !keys.length || keys.reduce((previous:boolean, element:string):boolean => {
                return previous && isString(element);
            }, true)) {
            handler([new Exception({message: "keys should be a non empty strings array"})], null);
        } else {
            this.call((errors:IException[], response:{[index:string]:number;}|any):void => {
                handler(errors && errors.length ? errors : null,
                    !errors || !errors.length && isDefined(response) ? response : null);
            }, "getTtls", this.getNamespace(), keys);
        }

    }

    public removeItem(key:string, callback?:(errors:IException[]) => void):void {

        function handler(errors:IException[]):void {
            if (isFunction(callback)) {
                setTimeout(():void => {
                    callback(errors);
                }, 0);
            }
            if (errors) {
                errors.forEach((error:IException):void => {
                    logger.error(error.getStack());
                });
            }
        }

        if (!isString(key)) {
            handler([new Exception({message : "key should be a string"})]);
        } else {
            this.call((errors:IException[]):void => {
                handler(errors && errors.length ? errors : null);
            }, "removeItem", this.getNamespace(), key);
        }

    }

    public removeItems(keys:string[], callback?:(errors:IException[]) => void) {

        function handler(errors:IException[]):void {
            if (isFunction(callback)) {
                setTimeout(():void => {
                    callback(errors);
                }, 0);
            }
            if (errors) {
                errors.forEach((error:IException):void => {
                    logger.error(error.getStack());
                });
            }
        }

        if (!isArray(keys) || !keys.length || keys.reduce((previous:boolean, element:string):boolean => {
                return previous && isString(element);
            }, true)) {
            handler([new Exception({message: "keys should be a non empty strings array"})]);
        } else {
            this.call((errors:IException[]):void => {
                handler(errors && errors.length ? errors : null);
            }, "removeItems", this.getNamespace(), keys);
        }

    }

    public hasItem(key:string, callback?:(errors:IException[], response:boolean) => void):void {

        function handler(errors:IException[], response:boolean):void {
            if (isFunction(callback)) {
                setTimeout(():void => {
                    callback(errors, response);
                }, 0);
            }
            if (errors) {
                errors.forEach((error:IException):void => {
                    logger.error(error.getStack());
                });
            }
        }

        if (!isString(key)) {
            handler([new Exception({message : "key should be a string"})], null);
        } else {
            this.call((errors:IException[], response:boolean):void => {
                handler(errors && errors.length ? errors : null,
                    !errors || !errors.length ? !!response : null);
            }, "hasItem", this.getNamespace(), key);
        }

    }

    public hasItems(keys:string[], callback?:(errors:IException[], response:{[index:string]:boolean;}|any) => void):void {

        function handler(errors:IException[], response:{[index:string]:boolean;}|any):void {
            if (isFunction(callback)) {
                setTimeout(():void => {
                    callback(errors, response);
                }, 0);
            }
            if (errors) {
                errors.forEach((error:IException):void => {
                    logger.error(error.getStack());
                });
            }
        }

        if (!isArray(keys) || !keys.length || keys.reduce((previous:boolean, element:string):boolean => {
                return previous && isString(element);
            }, true)) {
            handler([new Exception({message: "keys should be a non empty strings array"})], null);
        } else {
            this.call((errors:IException[], response:{[index:string]:boolean;}|any):void => {
                handler(errors && errors.length ? errors : null,
                    !errors || !errors.length && response ? response : null);
            }, "hasItems", this.getNamespace(), keys);
        }

    }

    public getKey(index:number, callback?:(errors:IException[], response:string) => void):void {

        function handler(errors:IException[], response:string):void {
            if (isFunction(callback)) {
                setTimeout(():void => {
                    callback(errors, response);
                }, 0);
            }
            if (errors) {
                errors.forEach((error:IException):void => {
                    logger.error(error.getStack());
                });
            }
        }

        if (!isNumber(index)) {
            handler([new Exception({message : "index should be a number"})], null);
        } else  {
            this.call((errors:IException[], response:string):void => {
                handler(errors && errors.length ? errors : null,
                    !errors || !errors.length ? String(response || "") || null : null);
            }, "getKey", this.getNamespace(), index);
        }

    }

    public getKeys(indexes:number[], callback?:(errors:IException[], response:string[]) => void):void {

        function handler(errors:IException[], response:string[]):void {
            if (isFunction(callback)) {
                setTimeout(():void => {
                    callback(errors, response);
                }, 0);
            }
            if (errors) {
                errors.forEach((error:IException):void => {
                    logger.error(error.getStack());
                });
            }
        }

        if (!isArray(indexes) || !indexes.length || !indexes.reduce((previous:boolean, element:number):boolean => {
                return previous && isNumber(element);
            }, true)) {
            handler([new Exception({message : "indexes should be a numbers array"})], null);
        } else {
            this.call((errors:IException[], response:string[]):void => {
                var errs:IException[] = null,
                    result:string[] = null;
                if (errors && errors.length) {
                    errs = errors;
                } else {
                    result = response || null;
                    if (!isArray(result) && !isNull(result)) {
                        result = [];
                    } else if (isArray(result)) {
                        result = result.map((element:any):string => {
                            return String(element || "");
                        });
                    }
                }
                handler(errs, result);
            }, "getKeys", this.getNamespace(), indexes);
        }
    }

    public getLength(callback?:(errors:IException[], response:number) => void):void {

        function handler(errors:IException[], response:number):void {
            if (isFunction(callback)) {
                setTimeout(():void => {
                    callback(errors, response);
                }, 0);
            }
            if (errors) {
                errors.forEach((error:IException):void => {
                    logger.error(error.getStack());
                });
            }
        }

        this.call((errors:IException[], response:number):void => {
            handler(errors && errors.length ? errors : null,
                !errors || !errors.length ? Math.max(0, parseInt(String(response), 10) || 0) : null);
        }, "getLength", this.getNamespace());

    }

    public increment(key:string, callback?:(errors:IException[], response:string) => void, ttL?:number):void {
        // todo: implement it
    }

    public decrement(key:string, callback?:(errors:IException[], response:string) => void, ttL?:number):void {
        // todo: implement it
    }

    public lock(key:string, callback?:(errors:IException[], unlock:(callback?:(errors:IException[]) => void) => void) => void):void {

        function handler(errors:IException[]):void {
            if (isFunction(callback)) {
                setTimeout(():void => {
                    callback(errors, unlock);
                }, 0);
            }
            if (errors) {
                errors.forEach((error:IException):void => {
                    logger.error(error.getStack());
                });
            }
        }

        var unlock:(callback?:(errors:IException[]) => void) => void =
                (callback?:(errors:IException[]) => void):void => {

                    function handler(errors:IException[]):void {
                        if (isFunction(callback)) {
                            setTimeout(():void => {
                                callback(errors);
                            }, 0);
                        }
                        if (errors) {
                            errors.forEach((error:IException):void => {
                                logger.error(error.getStack());
                            });
                        }
                    }

                    this.call((errors:IException[]):void => {
                        handler(errors && errors.length ? errors : null);
                    }, "unlock", this.getNamespace(), key);

                };

        if (!isString(key)) {
            handler([new Exception({message : "key should be a string"})]);
        } else {
            this.call((errors:IException[]):void => {
                handler(errors && errors.length ? errors : null);
            }, "lock", this.getNamespace(), key);
        }

    }

}

export = Client;
