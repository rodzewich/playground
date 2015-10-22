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
import Separator        = require("../../helpers/Separator");
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
        return new NamespaceHelper(["default"]);
    }

    protected getNamespaceHelper():INamespaceHelper {
        if (!this._namespaceHelper) {
            this._namespaceHelper = this.createNamespaceHelper();
        }
        return this._namespaceHelper;
    }

    constructor(options?:IOptions) {
        super(options);
        if (options && typeof options.namespace !== "undefined") {
            this.setNamespace(options.namespace);
        }
    }

    public getNamespace():string {
        return this.getNamespaceHelper().getValue();
    }

    public setNamespace(namespace:string):IClient {
        this.getNamespaceHelper().setNamespace(NamespaceHelper.parse(namespace, Separator.DOT).getNamespace());
        return this;
    }

    public setLocation(location:string):IClient {
        super.setLocation(location);
        return this;
    }

    public setTimeout(timeout:number):IClient {
        super.setTimeout(timeout);
        return this;
    }

    public setIsDebug(value:boolean):IClient {
        super.setIsDebug(value);
        return this;
    }

    public get namespace():string {
        return this.getNamespace();
    }

    public set namespace(namespace:string) {
        this.setNamespace(namespace);
    }

    public getInfo(callback?:(errors:IException[], response:IInformation) => void):IClient {

        function handler(errors:IException[], response:IInformation):void {
            if (isFunction(callback)) {
                setTimeout(():void => {
                    callback(errors, response);
                }, 0).ref();
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


        return this;

    }

    public getNamespaces(callback?:(errors:IException[], response:string[]) => void):IClient {

        function handler(errors:IException[], response:string[]):void {
            if (isFunction(callback)) {
                setTimeout(():void => {
                    callback(errors, response);
                }, 0).ref();
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

        return this;

    }

    public hasNamespace(namespace:string, callback?:(errors:IException[], response:boolean) => void):IClient {

        var realNamespace:string;

        function handler(errors:IException[], response:boolean):void {
            if (isFunction(callback)) {
                setTimeout(():void => {
                    callback(errors, response);
                }, 0).ref();
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
            try {
                realNamespace = NamespaceHelper.parse(namespace, Separator.DOT).getValue();
            } catch (error) {
                handler([ExceptionBase.convertFromError(error)], null);
            }
            if (isDefined(realNamespace)) {
                this.call((errors:IException[], response:boolean):void => {
                    handler(errors && errors.length ? errors : null,
                        !errors || !errors.length ? !!response : null);
                }, null, "hasNamespace", realNamespace);
            }
        }

        return this;

    }

    public removeNamespace(namespace:string, callback?:(errors:IException[]) => void):IClient {

        var realNamespace:string;

        function handler(errors:IException[]):void {
            if (isFunction(callback)) {
                setTimeout(():void => {
                    callback(errors);
                }, 0).ref();
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
            try {
                realNamespace = NamespaceHelper.parse(namespace, Separator.DOT).getValue();
            } catch (error) {
                handler([ExceptionBase.convertFromError(error)]);
            }
            if (isDefined(realNamespace)) {
                this.call((errors:IException[]):void => {
                    handler(errors && errors.length ? errors : null);
                }, null, "removeNamespace", realNamespace);
            }
        }

        return this;

    }

    public ping(callback?:(errors:IException[]) => void):IClient {

        function handler(errors:IException[]):void {
            if (isFunction(callback)) {
                setTimeout(():void => {
                    callback(errors);
                }, 0).ref();
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

        return this;

    }

    public stop(callback?:(errors:IException[]) => void):IClient {

        function handler(errors:IException[]):void {
            if (isFunction(callback)) {
                setTimeout(():void => {
                    callback(errors);
                }, 0).ref();
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

        return this;

    }

    public getItem(key:string, callback?:(errors:IException[], response:any) => void, namespace:string = this.getNamespace()):IClient {

        var realNamespace:string;

        function handler(errors:IException[], response:any):void {
            if (isFunction(callback)) {
                setTimeout(():void => {
                    callback(errors, response);
                }, 0).ref();
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
            try {
                realNamespace = NamespaceHelper.parse(namespace, Separator.DOT).getValue();
            } catch (error) {
                handler([ExceptionBase.convertFromError(error)], null);
            }
            if (isDefined(realNamespace)) {
                this.call((errors:IException[], response:any):void => {
                    handler(errors && errors.length ? errors : null,
                        (!errors || !errors.length) && isDefined(response) ? response : null);
                }, null, "getItem", realNamespace, key);
            }
        }

        return this;

    }

    public getItems(keys:string[], callback?:(errors:IException[], response:{[index:string]:any;}|any) => void, namespace:string = this.getNamespace()):IClient {

        var realNamespace:string;

        function handler(errors:IException[], response:{[index:string]:any;}|any):void {
            if (isFunction(callback)) {
                setTimeout(():void => {
                    callback(errors, response);
                }, 0).ref();
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
            try {
                realNamespace = NamespaceHelper.parse(namespace, Separator.DOT).getValue();
            } catch (error) {
                handler([ExceptionBase.convertFromError(error)], null);
            }
            if (isDefined(realNamespace)) {
                this.call((errors:IException[], response:{[index:string]:any;}|any):void => {
                    handler(errors && errors.length ? errors : null,
                        (!errors || !errors.length) && response ? response : null);
                }, null, "getItems", realNamespace, keys);
            }
        }

        return this;

    }

    public getBin(key:string, callback?:(errors:IException[], response:Buffer) => void, namespace:string = this.getNamespace()):IClient {

        var realNamespace:string;

        function handler(errors:IException[], response:any):void {
            if (isFunction(callback)) {
                setTimeout(():void => {
                    callback(errors, response);
                }, 0).ref();
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
            try {
                realNamespace = NamespaceHelper.parse(namespace, Separator.DOT).getValue();
            } catch (error) {
                handler([ExceptionBase.convertFromError(error)], null);
            }
            if (isDefined(realNamespace)) {
                this.call((errors:IException[], response:Buffer):void => {
                    try {
                        handler(errors && errors.length ? errors : null,
                            (!errors || !errors.length) && isDefined(response) ? new Buffer(String(response), "base64") : null);
                    } catch (err) {
                        handler([ExceptionBase.convertFromError(err)], null);
                    }
                }, null, "getBin", realNamespace, key);
            }
        }

        return this;

    }

    public getBins(keys:string[], callback?:(errors:IException[], response:{[index:string]:Buffer;}|any) => void, namespace:string = this.getNamespace()):IClient {

        var realNamespace:string;

        function handler(errors:IException[], response:{[index:string]:any;}|any):void {
            if (isFunction(callback)) {
                setTimeout(():void => {
                    callback(errors, response);
                }, 0).ref();
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
            try {
                realNamespace = NamespaceHelper.parse(namespace, Separator.DOT).getValue();
            } catch (error) {
                handler([ExceptionBase.convertFromError(error)], null);
            }
            if (isDefined(realNamespace)) {
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
                }, null, "getBins", realNamespace, keys);
            }
        }

        return this;

    }

    public setItem(key:string, value:any, ttl:number, callback?:(errors:IException[]) => void, namespace:string = this.getNamespace()):IClient {

        var realNamespace:string;

        function handler(errors:IException[]):void {
            if (isFunction(callback)) {
                setTimeout(():void => {
                    callback(errors);
                }, 0).ref();
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
            try {
                realNamespace = NamespaceHelper.parse(namespace, Separator.DOT).getValue();
            } catch (error) {
                handler([ExceptionBase.convertFromError(error)]);
            }
            if (isDefined(realNamespace)) {
                this.call((errors:IException[]):void => {
                    handler(errors && errors.length ? errors : null);
                }, null, "setItem", realNamespace, key, value, ttl ? Math.floor(ttl) : null);
            }
        }

        return this;

    }

    public setItems(data:{[index:string]:any;}|any, ttl:number, callback?:(errors:IException[]) => void, namespace:string = this.getNamespace()):IClient {

        var realNamespace:string;

        function handler(errors:IException[]):void {
            if (isFunction(callback)) {
                setTimeout(():void => {
                    callback(errors);
                }, 0).ref();
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
            try {
                realNamespace = NamespaceHelper.parse(namespace, Separator.DOT).getValue();
            } catch (error) {
                handler([ExceptionBase.convertFromError(error)]);
            }
            if (isDefined(realNamespace)) {
                this.call((errors:IException[]):void => {
                    handler(errors && errors.length ? errors : null);
                }, null, "setItems", realNamespace, data, ttl ? Math.floor(ttl) : null);
            }
        }

        return this;

    }

    public setBin(key:string, value:any, ttl:number, callback?:(errors:IException[]) => void, namespace:string = this.getNamespace()):IClient {

        var realNamespace:string,
            temp:string;

        function handler(errors:IException[]):void {
            if (isFunction(callback)) {
                setTimeout(():void => {
                    callback(errors);
                }, 0).ref();
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
            try {
                realNamespace = NamespaceHelper.parse(namespace, Separator.DOT).getValue();
            } catch (error) {
                handler([ExceptionBase.convertFromError(error)]);
            }
            if (isDefined(realNamespace)) {
                this.call((errors:IException[]):void => {
                    handler(errors && errors.length ? errors : null);
                }, null, "setBin", realNamespace, key, temp, ttl ? Math.floor(ttl) : null);
            }
        }

        return this;

    }

    public setBins(data:{[index:string]:any;}|any, ttl:number, callback?:(errors:IException[]) => void, namespace:string = this.getNamespace()):IClient {

        var temp:{[index:string]:string} = {},
            realNamespace:string,
            property:string;

        function handler(errors:IException[]):void {
            if (isFunction(callback)) {
                setTimeout(():void => {
                    callback(errors);
                }, 0).ref();
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
            try {
                realNamespace = NamespaceHelper.parse(namespace, Separator.DOT).getValue();
            } catch (error) {
                handler([ExceptionBase.convertFromError(error)]);
            }
            if (isDefined(realNamespace)) {
                this.call((errors:IException[]):void => {
                    handler(errors && errors.length ? errors : null);
                }, null, "setBins", realNamespace, temp, ttl ? Math.floor(ttl) : null);
            }
        }

        return this;

    }

    public getTtl(key:string, callback?:(errors:IException[], response:number) => void, namespace:string = this.getNamespace()):IClient {

        var realNamespace:string;

        function handler(errors:IException[], response:number):void {
            if (isFunction(callback)) {
                setTimeout(():void => {
                    callback(errors, response);
                }, 0).ref();
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
            try {
                realNamespace = NamespaceHelper.parse(namespace, Separator.DOT).getValue();
            } catch (error) {
                handler([ExceptionBase.convertFromError(error)], null);
            }
            if (isDefined(realNamespace)) {
                this.call((errors:IException[], response:any):void => {
                    handler(errors && errors.length ? errors : null,
                        (!errors || !errors.length) && isDefined(response) ? response : null);
                }, null, "getTtl", realNamespace, key);
            }
        }

        return this;

    }

    public getTtls(keys:string[], callback?:(errors:IException[], response:{[index:string]:number;}|any) => void, namespace:string = this.getNamespace()):IClient {

        var realNamespace:string;

        function handler(errors:IException[], response:{[index:string]:number;}|any):void {
            if (isFunction(callback)) {
                setTimeout(():void => {
                    callback(errors, response);
                }, 0).ref();
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
            try {
                realNamespace = NamespaceHelper.parse(namespace, Separator.DOT).getValue();
            } catch (error) {
                handler([ExceptionBase.convertFromError(error)], null);
            }
            if (isDefined(realNamespace)) {
                this.call((errors:IException[], response:{[index:string]:number;}|any):void => {
                    handler(errors && errors.length ? errors : null,
                        (!errors || !errors.length) && isDefined(response) ? response : null);
                }, null, "getTtls", realNamespace, keys);
            }
        }

        return this;

    }

    public setTtl(key:string, ttl:number, callback?:(errors:IException[], response:number) => void, namespace:string = this.getNamespace()):IClient {

        var realNamespace:string;

        function handler(errors:IException[], response:number):void {
            if (isFunction(callback)) {
                setTimeout(():void => {
                    callback(errors, response);
                }, 0).ref();
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
            try {
                realNamespace = NamespaceHelper.parse(namespace, Separator.DOT).getValue();
            } catch (error) {
                handler([ExceptionBase.convertFromError(error)], null);
            }
            if (isDefined(realNamespace)) {
                this.call((errors:IException[], response:any):void => {
                    handler(errors && errors.length ? errors : null,
                        (!errors || !errors.length) && isDefined(response) ? response : null);
                }, null, "setTtl", realNamespace, key, ttl);
            }
        }

        return this;

    }

    public setTtls(keys:string[], ttl:number, callback?:(errors:IException[], response:{[index:string]:number;}|any) => void, namespace:string = this.getNamespace()):IClient {

        var realNamespace:string;

        function handler(errors:IException[], response:{[index:string]:number;}|any):void {
            if (isFunction(callback)) {
                setTimeout(():void => {
                    callback(errors, response);
                }, 0).ref();
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
            try {
                realNamespace = NamespaceHelper.parse(namespace, Separator.DOT).getValue();
            } catch (error) {
                handler([ExceptionBase.convertFromError(error)], null);
            }
            if (isDefined(realNamespace)) {
                this.call((errors:IException[], response:{[index:string]:number;}|any):void => {
                    handler(errors && errors.length ? errors : null,
                        (!errors || !errors.length) && isDefined(response) ? response : null);
                }, null, "setTtls", realNamespace, keys, ttl);
            }
        }

        return this;

    }

    public removeItem(key:string, callback?:(errors:IException[]) => void, namespace:string = this.getNamespace()):IClient {

        var realNamespace:string;

        function handler(errors:IException[]):void {
            if (isFunction(callback)) {
                setTimeout(():void => {
                    callback(errors);
                }, 0).ref();
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
            try {
                realNamespace = NamespaceHelper.parse(namespace, Separator.DOT).getValue();
            } catch (error) {
                handler([ExceptionBase.convertFromError(error)]);
            }
            if (isDefined(realNamespace)) {
                this.call((errors:IException[]):void => {
                    handler(errors && errors.length ? errors : null);
                }, null, "removeItem", realNamespace, key);
            }
        }

        return this;

    }

    public removeItems(keys:string[], callback?:(errors:IException[]) => void, namespace:string = this.getNamespace()):IClient {

        var realNamespace:string;

        function handler(errors:IException[]):void {
            if (isFunction(callback)) {
                setTimeout(():void => {
                    callback(errors);
                }, 0).ref();
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
            try {
                realNamespace = NamespaceHelper.parse(namespace, Separator.DOT).getValue();
            } catch (error) {
                handler([ExceptionBase.convertFromError(error)]);
            }
            if (isDefined(realNamespace)) {
                this.call((errors:IException[]):void => {
                    handler(errors && errors.length ? errors : null);
                }, null, "removeItems", realNamespace, keys);
            }
        }

        return this;

    }

    public hasItem(key:string, callback?:(errors:IException[], response:boolean) => void, namespace:string = this.getNamespace()):IClient {

        var realNamespace:string;

        function handler(errors:IException[], response:boolean):void {
            if (isFunction(callback)) {
                setTimeout(():void => {
                    callback(errors, response);
                }, 0).ref();
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
            try {
                realNamespace = NamespaceHelper.parse(namespace, Separator.DOT).getValue();
            } catch (error) {
                handler([ExceptionBase.convertFromError(error)], null);
            }
            if (isDefined(realNamespace)) {
                this.call((errors:IException[], response:boolean):void => {
                    handler(errors && errors.length ? errors : null,
                        !errors || !errors.length ? !!response : null);
                }, null, "hasItem", realNamespace, key);
            }
        }

        return this;

    }

    public hasItems(keys:string[], callback?:(errors:IException[], response:{[index:string]:boolean;}|any) => void, namespace:string = this.getNamespace()):IClient {

        var realNamespace:string;

        function handler(errors:IException[], response:{[index:string]:boolean;}|any):void {
            if (isFunction(callback)) {
                setTimeout(():void => {
                    callback(errors, response);
                }, 0).ref();
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
            try {
                realNamespace = NamespaceHelper.parse(namespace, Separator.DOT).getValue();
            } catch (error) {
                handler([ExceptionBase.convertFromError(error)], null);
            }
            if (realNamespace) {
                this.call((errors:IException[], response:{[index:string]:boolean;}|any):void => {
                    handler(errors && errors.length ? errors : null,
                        !errors || !errors.length ? response || null : null);
                }, null, "hasItems", realNamespace, keys);
            }
        }

        return this;

    }

    public getKey(index:number, callback?:(errors:IException[], response:string) => void, namespace:string = this.getNamespace()):IClient {

        var realNamespace:string;

        function handler(errors:IException[], response:string):void {
            if (isFunction(callback)) {
                setTimeout(():void => {
                    callback(errors, response);
                }, 0).ref();
            }
            if (errors) {
                errors.forEach((error:IException):void => {
                    logger.error(error.getStack());
                });
            }
        }

        if (!isNumber(index) || isNaN(index) || index < 0) {
            handler([new Exception({message : "index should be a positive number"})], null);
        } else {
            try {
                realNamespace = NamespaceHelper.parse(namespace, Separator.DOT).getValue();
            } catch (error) {
                handler([ExceptionBase.convertFromError(error)], null);
            }
            if (realNamespace) {
                this.call((errors:IException[], response:string):void => {
                    handler(errors && errors.length ? errors : null,
                        !errors || !errors.length ? String(response || "") || null : null);
                }, null, "getKey", realNamespace, index);
            }
        }

        return this;

    }

    public getKeys(indexes:number[], callback?:(errors:IException[], response:string[]) => void, namespace:string = this.getNamespace()):IClient {

        var realNamespace:string;

        function handler(errors:IException[], response:string[]):void {
            if (isFunction(callback)) {
                setTimeout(():void => {
                    callback(errors, response);
                }, 0).ref();
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
            try {
                realNamespace = NamespaceHelper.parse(namespace, Separator.DOT).getValue();
            } catch (error) {
                handler([ExceptionBase.convertFromError(error)], null);
            }
            if (realNamespace) {
                this.call((errors:IException[], response:string[]):void => {
                    var errs:IException[] = null,
                        result:string[]   = null;
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
                }, null, "getKeys", realNamespace, indexes);
            }
        }

        return this;

    }

    public getLength(callback?:(errors:IException[], response:number) => void, namespace:string = this.getNamespace()):IClient {

        var realNamespace:string;

        function handler(errors:IException[], response:number):void {
            if (isFunction(callback)) {
                setTimeout(():void => {
                    callback(errors, response);
                }, 0).ref();
            }
            if (errors) {
                errors.forEach((error:IException):void => {
                    logger.error(error.getStack());
                });
            }
        }

        try {
            realNamespace = NamespaceHelper.parse(namespace, Separator.DOT).getValue();
        } catch (error) {
            handler([ExceptionBase.convertFromError(error)], null);
        }

        if (realNamespace) {
            this.call((errors:IException[], response:number):void => {
                handler(errors && errors.length ? errors : null,
                    !errors || !errors.length ? Math.max(0, parseInt(String(response), 10) || 0) : null);
            }, null, "getLength", realNamespace);
        }

        return this;

    }

    public increment(key:string, ttl:number, callback?:(errors:IException[], response:string) => void, namespace:string = this.getNamespace()):IClient {

        var realNamespace:string;

        function handler(errors:IException[], response:string):void {
            if (isFunction(callback)) {
                setTimeout(():void => {
                    callback(errors, response);
                }, 0).ref();
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
            try {
                realNamespace = NamespaceHelper.parse(namespace, Separator.DOT).getValue();
            } catch (error) {
                handler([ExceptionBase.convertFromError(error)], null);
            }
            if (realNamespace) {
                this.call((errors:IException[], response:string):void => {
                    handler(errors && errors.length ? errors : null,
                        !errors || !errors.length ? response || null : null);
                }, null, "increment", realNamespace, key, ttl);
            }
        }

        return this;

    }

    public decrement(key:string, ttl:number, callback?:(errors:IException[], response:string) => void, namespace:string = this.getNamespace()):IClient {

        var realNamespace:string;

        function handler(errors:IException[], response:string):void {
            if (isFunction(callback)) {
                setTimeout(():void => {
                    callback(errors, response);
                }, 0).ref();
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
            try {
                realNamespace = NamespaceHelper.parse(namespace, Separator.DOT).getValue();
            } catch (error) {
                handler([ExceptionBase.convertFromError(error)], null);
            }
            if (realNamespace) {
                this.call((errors:IException[], response:string):void => {
                    handler(errors && errors.length ? errors : null,
                        !errors || !errors.length ? response || null : null);
                }, null, "decrement", realNamespace, key, ttl);
            }
        }

        return this;

    }

    public lock(key:string, callback?:(errors:IException[], unlock:(callback?:(errors:IException[]) => void) => void) => void, namespace:string = this.getNamespace()):IClient {

        function handler(errors:IException[]):void {
            if (isFunction(callback)) {
                setTimeout(():void => {
                    callback(errors, unlock);
                }, 0).ref();
            }
            if (errors) {
                errors.forEach((error:IException):void => {
                    logger.error(error.getStack());
                });
            }
        }

        var realNamespace:string,
            unlock:(callback?:(errors:IException[]) => void) => void =
                (callback?:(errors:IException[]) => void):void => {

                    function handler(errors:IException[]):void {
                        if (isFunction(callback)) {
                            setTimeout(():void => {
                                callback(errors);
                            }, 0).ref();
                        }
                        if (errors) {
                            errors.forEach((error:IException):void => {
                                logger.error(error.getStack());
                            });
                        }
                    }

                    this.call((errors:IException[]):void => {
                        handler(errors && errors.length ? errors : null);
                    }, null, "unlock", realNamespace, key);

                };

        if (!isString(key)) {
            handler([new Exception({message : "key should be a string"})]);
        } else {
            try {
                realNamespace = NamespaceHelper.parse(namespace, Separator.DOT).getValue();
            } catch (error) {
                handler([ExceptionBase.convertFromError(error)]);
            }
            if (realNamespace) {
                this.call((errors:IException[]):void => {
                    handler(errors && errors.length ? errors : null);
                }, -1, "lock", realNamespace, key);
            }
        }

        return this;

    }

    public static create(options?:IOptions):IClient {
        return new Client(options);
    }

}

export = Client;
