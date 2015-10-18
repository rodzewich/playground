/// <reference path="../../../types/node/node.d.ts" />

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
import ClientBase       = require("../../client/Client");
import Exception        = require("../exception/Exception");
import IException       = require("../exception/IException");
import ExceptionBase    = require("../../exception/Exception");
import NamespaceHelper  = require("../../helpers/NamespaceHelper");
import INamespaceHelper = require("../../helpers/INamespaceHelper");
import log4js           = require("../../../logger");

var logger:log4js.Logger = log4js.getLogger("memory");

class Client extends ClientBase implements IClient {

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

        function handler(errors:IException[], response:IInformation):void {
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

        this.call((errors:IException[], response:IInformation):void => {
            handler(errors && errors.length ? errors : null,
                !errors || !errors.length ? response || null : null);
        }, null, "getInfo");


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
                !errors || !errors.length ? response || null : null);
        }, null, "getNamespaces");

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
            }, null, "hasNamespace", namespace);
        }

    }

    public removeNamespace(namespace:string, callback?:(errors:IException[]) => void):void {

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

        if (!isString(namespace)) {
            handler([new Exception({message : "namespace should be a string"})]);
        } else {
            this.call((errors:IException[]):void => {
                handler(errors && errors.length ? errors : null);
            }, null, "removeNamespace", namespace);
        }

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
        }, null, "ping");

    }

    public stop(callback?:(errors:IException[]) => void):void {

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
        }, null, "stop");

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
                    (!errors || !errors.length) && isDefined(response) ? response : null);
            }, null, "getItem", this.getNamespace(), key);
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

        if (!isArray(keys) || !keys.length || !keys.reduce((previous:boolean, element:string):boolean => {
                return previous && isString(element);
            }, true)) {
            handler([new Exception({message: "keys should be a non empty strings array"})], null);
        } else {
            this.call((errors:IException[], response:{[index:string]:any;}|any):void => {
                handler(errors && errors.length ? errors : null,
                    (!errors || !errors.length) && response ? response : null);
            }, null, "getItems", this.getNamespace(), keys);
        }

    }

    public getBin(key:string, callback?:(errors:IException[], response:Buffer) => void):void {

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
            this.call((errors:IException[], response:Buffer):void => {
                try {
                    handler(errors && errors.length ? errors : null,
                        (!errors || !errors.length) && isDefined(response) ? new Buffer(String(response), "base64") : null);
                } catch (err) {
                    handler([ExceptionBase.convertFromError(err)], null);
                }
            }, null, "getBin", this.getNamespace(), key);
        }

    }

    public getBins(keys:string[], callback?:(errors:IException[], response:{[index:string]:Buffer;}|any) => void):void {

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

        if (!isArray(keys) || !keys.length || !keys.reduce((previous:boolean, element:string):boolean => {
                return previous && isString(element);
            }, true)) {
            handler([new Exception({message: "keys should be a non empty strings array"})], null);
        } else {
            this.call((errors:IException[], response:{[index:string]:Buffer;}|any):void => {
                var temp:{[index:string]:Buffer;} = null,
                    property:string;
                try {
                    if (response) {
                        temp = {};
                        for (property in response) {
                            if (!response.hasOwnProperty(property)) {
                                continue;
                            }
                            temp[property] = new Buffer(String(response[property]), "base64");
                        }
                    }
                } catch (err) {
                    handler([ExceptionBase.convertFromError(err)], null);
                }
                handler(errors && errors.length ? errors : null,
                    (!errors || !errors.length) && response ? temp : null);
            }, null, "getBins", this.getNamespace(), keys);
        }

    }

    public setItem(key:string, value:any, ttl:number, callback?:(errors:IException[]) => void):void {

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
            }, null, "setItem", this.getNamespace(), key, value, ttl ? Math.floor(ttl) : null);
        }

    }

    public setItems(data:{[index:string]:any;}|any, ttl:number, callback?:(errors:IException[]) => void):void {

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
            }, null, "setItems", this.getNamespace(), data, ttl ? Math.floor(ttl) : null);
        }

    }

    public setBin(key:string, value:any, ttl:number, callback?:(errors:IException[]) => void):void {

        var temp:string;

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
            if (value instanceof Buffer) {
                temp = value.toString("base64");
            } else {
                temp = new Buffer(String(value)).toString("base64");
            }
            this.call((errors:IException[]):void => {
                handler(errors && errors.length ? errors : null);
            }, null, "setBin", this.getNamespace(), key, temp, ttl ? Math.floor(ttl) : null);
        }

    }

    public setBins(data:{[index:string]:any;}|any, ttl:number, callback?:(errors:IException[]) => void):void {

        var temp:{[index:string]:string} = {},
            property:string;

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
            for (property in data) {
                if (!data.hasOwnProperty(property)) {
                    continue;
                }
                if (data[property] instanceof Buffer) {
                    temp[property] = (<Buffer>data[property]).toString("base64");
                } else {
                    temp[property] = new Buffer(String(data[property])).toString("base64");
                }
            }
            this.call((errors:IException[]):void => {
                handler(errors && errors.length ? errors : null);
            }, null, "setBins", this.getNamespace(), temp, ttl ? Math.floor(ttl) : null);
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
                    (!errors || !errors.length) && isDefined(response) ? response : null);
            }, null, "getTtl", this.getNamespace(), key);
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
                    (!errors || !errors.length) && isDefined(response) ? response : null);
            }, null, "getTtls", this.getNamespace(), keys);
        }

    }

    public setTtl(key:string, ttl:number, callback?:(errors:IException[], response:number) => void):void {

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
        } else if (isDefined(ttl) && !isNull(ttl) && (!isNumber(ttl) || isNaN(ttl) || ttl < 0)) {
            handler([new Exception({message : "ttl should be a positive integer"})], null);
        } else {
            this.call((errors:IException[], response:any):void => {
                handler(errors && errors.length ? errors : null,
                    (!errors || !errors.length) && isDefined(response) ? response : null);
            }, null, "setTtl", this.getNamespace(), key, ttl);
        }

    }

    public setTtls(keys:string[], ttl:number, callback?:(errors:IException[], response:{[index:string]:number;}|any) => void):void {

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
        } else if (isDefined(ttl) && !isNull(ttl) && (!isNumber(ttl) || isNaN(ttl) || ttl < 0)) {
            handler([new Exception({message : "ttl should be a positive integer"})], null);
        } else {
            this.call((errors:IException[], response:{[index:string]:number;}|any):void => {
                handler(errors && errors.length ? errors : null,
                    (!errors || !errors.length) && isDefined(response) ? response : null);
            }, null, "setTtls", this.getNamespace(), keys, ttl);
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
            }, null, "removeItem", this.getNamespace(), key);
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

        if (!isArray(keys) || !keys.length || !keys.reduce((previous:boolean, element:string):boolean => {
                return previous && isString(element);
            }, true)) {
            handler([new Exception({message: "keys should be a non empty strings array"})]);
        } else {
            this.call((errors:IException[]):void => {
                handler(errors && errors.length ? errors : null);
            }, null, "removeItems", this.getNamespace(), keys);
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
            }, null, "hasItem", this.getNamespace(), key);
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

        if (!isArray(keys) || !keys.length || !keys.reduce((previous:boolean, element:string):boolean => {
                return previous && isString(element);
            }, true)) {
            handler([new Exception({message: "keys should be a non empty strings array"})], null);
        } else {
            this.call((errors:IException[], response:{[index:string]:boolean;}|any):void => {
                handler(errors && errors.length ? errors : null,
                    !errors || !errors.length ? response || null : null);
            }, null, "hasItems", this.getNamespace(), keys);
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

        if (!isNumber(index) || isNaN(index) || index < 0) {
            handler([new Exception({message : "index should be a positive number"})], null);
        } else  {
            this.call((errors:IException[], response:string):void => {
                handler(errors && errors.length ? errors : null,
                    !errors || !errors.length ? String(response || "") || null : null);
            }, null, "getKey", this.getNamespace(), index);
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
                return previous && isNumber(element) && element >= 0;
            }, true)) {
            handler([new Exception({message : "indexes should be a positive numbers array"})], null);
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
            }, null, "getKeys", this.getNamespace(), indexes);
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
        }, null, "getLength", this.getNamespace());

    }

    public increment(key:string, callback?:(errors:IException[], response:string) => void, ttl?:number):void {

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

        if (!isString(key)) {
            handler([new Exception({message : "key should be a string"})], null);
        } else if (isDefined(ttl) && !isNull(ttl) && (!isNumber(ttl) || isNaN(ttl) || ttl < 0)) {
            handler([new Exception({message : "ttl should be a positive integer"})], null);
        } else {
            this.call((errors:IException[], response:string):void => {
                handler(errors && errors.length ? errors : null,
                    !errors || !errors.length ? response || null : null);
            }, null, "increment", this.getNamespace(), key, ttl);
        }

    }

    public decrement(key:string, callback?:(errors:IException[], response:string) => void, ttl?:number):void {

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

        if (!isString(key)) {
            handler([new Exception({message : "key should be a string"})], null);
        } else if (isDefined(ttl) && !isNull(ttl) && (!isNumber(ttl) || isNaN(ttl) || ttl < 0)) {
            handler([new Exception({message : "ttl should be a positive integer"})], null);
        } else {
            this.call((errors:IException[], response:string):void => {
                handler(errors && errors.length ? errors : null,
                    !errors || !errors.length ? response || null : null);
            }, null, "decrement", this.getNamespace(), key, ttl);
        }

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
                    }, null, "unlock", this.getNamespace(), key);

                };

        if (!isString(key)) {
            handler([new Exception({message : "key should be a string"})]);
        } else {
            this.call((errors:IException[]):void => {
                handler(errors && errors.length ? errors : null);
            }, -1, "lock", this.getNamespace(), key);
        }

    }

}

export = Client;
