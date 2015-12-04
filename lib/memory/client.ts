/// <reference path="../../types/node/node.d.ts" />

import * as log4js from "../../logger";
import {isNull, isDefined, isArray, isString, isObject, isNumber, isFunction} from "../utils";
import {IOptions as IOptionsBase, IClient as IClientBase, Client as ClientBase} from "../client";
import {IException, Exception} from "./exception";
import {Exception as ExceptionBase} from "../exception";
import {INamespaceHelper, NamespaceHelper, SeparatorHelper} from "../helpers/namespaceHelper";

var logger:log4js.Logger = log4js.getLogger("memory");

export interface IOptions extends IOptionsBase {
    namespace?:string;
}

export interface IInformation {
    pid:number;
    gid:number;
    uid:number;
    cwd:string;
    arch:string;
    uptime:number;
    platform:string;
    version:string;
    execPath:string;
    execArgv:string[];
    memoryUsage:{
        rss:number;
        heapTotal:number;
        heapUsed:number;
    };
}

export interface IClient extends IClientBase {
    namespace:string;
    getNamespace():string;
    setNamespace(namespace:string):void;
    ping(callback?:(errors:IException[]) => void):void;
    stop(callback?:(errors:IException[]) => void):void;
    getInfo(callback?:(errors:IException[], response:IInformation) => void):void;
    getNamespaces(callback?:(errors:IException[], response:string[]) => void):void;
    hasNamespace(namespace:string, callback?:(errors:IException[], response:boolean) => void):void;
    removeNamespace(namespace:string, callback?:(errors:IException[]) => void):void;
    getItem(key:string, callback?:(errors:IException[], response:any) => void, namespace?:string):void;
    getItems(keys:string[], callback?:(errors:IException[], response:{[index:string]:any;}|any) => void, namespace?:string):void;
    getBin(key:string, callback?:(errors:IException[], response:Buffer) => void, namespace?:string):void;
    getBins(keys:string[], callback?:(errors:IException[], response:{[index:string]:Buffer;}|any) => void, namespace?:string):void;
    setItem(key:string, value:any, ttl:number, callback?:(errors:IException[]) => void, namespace?:string):void;
    setItems(data:{[index:string]:any;}|any, ttl:number, callback?:(errors:IException[]) => void, namespace?:string):void;
    setBin(key:string, value:any, ttl:number, callback?:(errors:IException[]) => void, namespace?:string):void;
    setBins(data:{[index:string]:any;}|any, ttl:number, callback?:(errors:IException[]) => void, namespace?:string):void;
    getTtl(key:string, callback?:(errors:IException[], response:number) => void, namespace?:string):void;
    getTtls(keys:string[], callback?:(errors:IException[], response:{[index:string]:number;}|any) => void, namespace?:string):void;
    setTtl(key:string, ttl:number, callback?:(errors:IException[]) => void, namespace?:string):void;
    setTtls(keys:string[], ttl:number, callback?:(errors:IException[]) => void, namespace?:string):void;
    increment(key:string, ttl:number, callback?:(errors:IException[], response:string) => void, namespace?:string):void;
    decrement(key:string, ttl:number, callback?:(errors:IException[], response:string) => void, namespace?:string):void;
    removeItem(key:string, callback?:(errors:IException[]) => void, namespace?:string):void;
    removeItems(keys:string[], callback?:(errors:IException[]) => void, namespace?:string):void;
    hasItem(key:string, callback?:(errors:IException[], response:boolean) => void, namespace?:string):void;
    hasItems(keys:string[], callback?:(errors:IException[], response:{[index:string]:boolean;}|any) => void, namespace?:string):void;
    getKey(index:number, callback?:(errors:IException[], response:string) => void, namespace?:string):void;
    getKeys(indexes:number[], callback?:(errors:IException[], response:string[]) => void, namespace?:string):void;
    getLength(callback?:(errors:IException[], response:number) => void, namespace?:string):void;
    lock(key:string, callback?:(errors:IException[], unlock:(callback?:(errors:IException[]) => void) => void) => void, namespace?:string):void;
}

export class Client extends ClientBase implements IClient {

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
        if (options && isDefined(options.namespace)) {
            this.setNamespace(options.namespace);
        }
    }

    public getNamespace():string {
        return this.getNamespaceHelper().getValue();
    }

    public setNamespace(namespace:string):void {
        this.getNamespaceHelper().setNamespace(NamespaceHelper.parse(namespace, SeparatorHelper.DOT).getNamespace());
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


    }

    public getNamespaces(callback?:(errors:IException[], response:string[]) => void):void {

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

    }

    public hasNamespace(namespace:string, callback?:(errors:IException[], response:boolean) => void):void {

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
                realNamespace = NamespaceHelper.parse(namespace, SeparatorHelper.DOT).getValue();
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

    }

    public removeNamespace(namespace:string, callback?:(errors:IException[]) => void):void {

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
                realNamespace = NamespaceHelper.parse(namespace, SeparatorHelper.DOT).getValue();
            } catch (error) {
                handler([ExceptionBase.convertFromError(error)]);
            }
            if (isDefined(realNamespace)) {
                this.call((errors:IException[]):void => {
                    handler(errors && errors.length ? errors : null);
                }, null, "removeNamespace", realNamespace);
            }
        }

    }

    public ping(callback?:(errors:IException[]) => void):void {

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

    }

    public stop(callback?:(errors:IException[]) => void):void {

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

    }

    public getItem(key:string, callback?:(errors:IException[], response:any) => void, namespace:string = this.getNamespace()):void {

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
                realNamespace = NamespaceHelper.parse(namespace, SeparatorHelper.DOT).getValue();
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

    }

    public getItems(keys:string[], callback?:(errors:IException[], response:{[index:string]:any;}|any) => void, namespace:string = this.getNamespace()):void {

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
                realNamespace = NamespaceHelper.parse(namespace, SeparatorHelper.DOT).getValue();
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

    }

    public getBin(key:string, callback?:(errors:IException[], response:Buffer) => void, namespace:string = this.getNamespace()):void {

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
                realNamespace = NamespaceHelper.parse(namespace, SeparatorHelper.DOT).getValue();
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

    }

    public getBins(keys:string[], callback?:(errors:IException[], response:{[index:string]:Buffer;}|any) => void, namespace:string = this.getNamespace()):void {

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
                realNamespace = NamespaceHelper.parse(namespace, SeparatorHelper.DOT).getValue();
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

    }

    public setItem(key:string, value:any, ttl:number, callback?:(errors:IException[]) => void, namespace:string = this.getNamespace()):void {

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
                realNamespace = NamespaceHelper.parse(namespace, SeparatorHelper.DOT).getValue();
            } catch (error) {
                handler([ExceptionBase.convertFromError(error)]);
            }
            if (isDefined(realNamespace)) {
                this.call((errors:IException[]):void => {
                    handler(errors && errors.length ? errors : null);
                }, null, "setItem", realNamespace, key, value, ttl ? Math.floor(ttl) : null);
            }
        }

    }

    public setItems(data:{[index:string]:any;}|any, ttl:number, callback?:(errors:IException[]) => void, namespace:string = this.getNamespace()):void {

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
                realNamespace = NamespaceHelper.parse(namespace, SeparatorHelper.DOT).getValue();
            } catch (error) {
                handler([ExceptionBase.convertFromError(error)]);
            }
            if (isDefined(realNamespace)) {
                this.call((errors:IException[]):void => {
                    handler(errors && errors.length ? errors : null);
                }, null, "setItems", realNamespace, data, ttl ? Math.floor(ttl) : null);
            }
        }

    }

    public setBin(key:string, value:any, ttl:number, callback?:(errors:IException[]) => void, namespace:string = this.getNamespace()):void {

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
                realNamespace = NamespaceHelper.parse(namespace, SeparatorHelper.DOT).getValue();
            } catch (error) {
                handler([ExceptionBase.convertFromError(error)]);
            }
            if (isDefined(realNamespace)) {
                this.call((errors:IException[]):void => {
                    handler(errors && errors.length ? errors : null);
                }, null, "setBin", realNamespace, key, temp, ttl ? Math.floor(ttl) : null);
            }
        }

    }

    public setBins(data:{[index:string]:any;}|any, ttl:number, callback?:(errors:IException[]) => void, namespace:string = this.getNamespace()):void {

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
                realNamespace = NamespaceHelper.parse(namespace, SeparatorHelper.DOT).getValue();
            } catch (error) {
                handler([ExceptionBase.convertFromError(error)]);
            }
            if (isDefined(realNamespace)) {
                this.call((errors:IException[]):void => {
                    handler(errors && errors.length ? errors : null);
                }, null, "setBins", realNamespace, temp, ttl ? Math.floor(ttl) : null);
            }
        }

    }

    public getTtl(key:string, callback?:(errors:IException[], response:number) => void, namespace:string = this.getNamespace()):void {

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
                realNamespace = NamespaceHelper.parse(namespace, SeparatorHelper.DOT).getValue();
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

    }

    public getTtls(keys:string[], callback?:(errors:IException[], response:{[index:string]:number;}|any) => void, namespace:string = this.getNamespace()):void {

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
                realNamespace = NamespaceHelper.parse(namespace, SeparatorHelper.DOT).getValue();
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

    }

    public setTtl(key:string, ttl:number, callback?:(errors:IException[], response:number) => void, namespace:string = this.getNamespace()):void {

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
                realNamespace = NamespaceHelper.parse(namespace, SeparatorHelper.DOT).getValue();
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

    }

    public setTtls(keys:string[], ttl:number, callback?:(errors:IException[], response:{[index:string]:number;}|any) => void, namespace:string = this.getNamespace()):void {

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
                realNamespace = NamespaceHelper.parse(namespace, SeparatorHelper.DOT).getValue();
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

    }

    public removeItem(key:string, callback?:(errors:IException[]) => void, namespace:string = this.getNamespace()):void {

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
                realNamespace = NamespaceHelper.parse(namespace, SeparatorHelper.DOT).getValue();
            } catch (error) {
                handler([ExceptionBase.convertFromError(error)]);
            }
            if (isDefined(realNamespace)) {
                this.call((errors:IException[]):void => {
                    handler(errors && errors.length ? errors : null);
                }, null, "removeItem", realNamespace, key);
            }
        }

    }

    public removeItems(keys:string[], callback?:(errors:IException[]) => void, namespace:string = this.getNamespace()):void {

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
                realNamespace = NamespaceHelper.parse(namespace, SeparatorHelper.DOT).getValue();
            } catch (error) {
                handler([ExceptionBase.convertFromError(error)]);
            }
            if (isDefined(realNamespace)) {
                this.call((errors:IException[]):void => {
                    handler(errors && errors.length ? errors : null);
                }, null, "removeItems", realNamespace, keys);
            }
        }

    }

    public hasItem(key:string, callback?:(errors:IException[], response:boolean) => void, namespace:string = this.getNamespace()):void {

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
                realNamespace = NamespaceHelper.parse(namespace, SeparatorHelper.DOT).getValue();
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

    }

    public hasItems(keys:string[], callback?:(errors:IException[], response:{[index:string]:boolean;}|any) => void, namespace:string = this.getNamespace()):void {

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
                realNamespace = NamespaceHelper.parse(namespace, SeparatorHelper.DOT).getValue();
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

    }

    public getKey(index:number, callback?:(errors:IException[], response:string) => void, namespace:string = this.getNamespace()):void {

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
                realNamespace = NamespaceHelper.parse(namespace, SeparatorHelper.DOT).getValue();
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

    }

    public getKeys(indexes:number[], callback?:(errors:IException[], response:string[]) => void, namespace:string = this.getNamespace()):void {

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
                realNamespace = NamespaceHelper.parse(namespace, SeparatorHelper.DOT).getValue();
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

    }

    public getLength(callback?:(errors:IException[], response:number) => void, namespace:string = this.getNamespace()):void {

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
            realNamespace = NamespaceHelper.parse(namespace, SeparatorHelper.DOT).getValue();
        } catch (error) {
            handler([ExceptionBase.convertFromError(error)], null);
        }

        if (realNamespace) {
            this.call((errors:IException[], response:number):void => {
                handler(errors && errors.length ? errors : null,
                    !errors || !errors.length ? Math.max(0, parseInt(String(response), 10) || 0) : null);
            }, null, "getLength", realNamespace);
        }

    }

    public increment(key:string, ttl:number, callback?:(errors:IException[], response:string) => void, namespace:string = this.getNamespace()):void {

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
                realNamespace = NamespaceHelper.parse(namespace, SeparatorHelper.DOT).getValue();
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

    }

    public decrement(key:string, ttl:number, callback?:(errors:IException[], response:string) => void, namespace:string = this.getNamespace()):void {

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
                realNamespace = NamespaceHelper.parse(namespace, SeparatorHelper.DOT).getValue();
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

    }

    public lock(key:string, callback?:(errors:IException[], unlock:(callback?:(errors:IException[]) => void) => void) => void, namespace:string = this.getNamespace()):void {

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
                realNamespace = NamespaceHelper.parse(namespace, SeparatorHelper.DOT).getValue();
            } catch (error) {
                handler([ExceptionBase.convertFromError(error)]);
            }
            if (realNamespace) {
                this.call((errors:IException[]):void => {
                    handler(errors && errors.length ? errors : null);
                }, -1, "lock", realNamespace, key);
            }
        }

    }

    public static create(options?:IOptions):IClient {
        return new Client(options);
    }

}
