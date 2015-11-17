/// <reference path="../../types/node/node.d.ts" />

import {IOptions as IOptionsBase, IDaemon as IDaemonBase, Daemon as DaemonBase} from "../daemon";
import {IInformation} from "./client";
import {Exception as ExceptionBase} from "../exception";
import {IObject, IException, Exception} from "./exception";
import {isFunction, isDefined, isNumber} from "../utils";
import log4js        = require("../../logger");
import IIncrementableBigIntegerHelper = require("../helpers/IIncrementableBigIntegerHelper");
import IncrementableBigIntegerHelper  = require("../helpers/IncrementableBigIntegerHelper");

var logger:log4js.Logger = log4js.getLogger("memory");



export interface IOptions extends IOptionsBase {
}


export interface IDaemon extends IDaemonBase {
    getNamespaces():string[];
    hasNamespace(namespace:string):boolean;
    removeNamespace(namespace:string):void;
    getInfo():IInformation;
    getItem(namespace:string, key:string):any;
    getItems(namespace:string, keys:string[]):any;
    getBin(namespace:string, key:string):Buffer;
    getBins(namespace:string, keys:string[]):{[index:string]:Buffer}|any;
    setItem(namespace:string, key:string, value:any, ttl:number):void;
    setItems(namespace:string, data:any, ttl:number):void;
    setBin(namespace:string, key:string, value:string, ttl:number):void;
    setBins(namespace:string, data:{[index:string]:string}|any, ttl:number):void;
    removeItem(namespace:string, key:string):void;
    removeItems(namespace:string, keys:string[]):void;
    hasItem(namespace:string, key:string):boolean;
    hasItems(namespace:string, keys:string[]):boolean[];
    getKey(namespace:string, index:number):string;
    getKeys(namespace:string, indexes:number[]):string[];
    getLength(namespace:string):number;
    increment(namespace:string, key:string, ttl:number):void;
    decrement(namespace:string, key:string, ttl:number):void;
    lock(namespace:string, key:string, callback?:(errors:IException[]) => void):void;
    unlock(namespace:string, key:string):void;
}

export class Daemon extends DaemonBase implements IDaemon {

    private _memory:any = {};

    private _locks:any = {};

    private _queues:any = {};

    private _timers:{[namespace:string]:{[index:string]:NodeJS.Timer}} = {};

    private _removeTimeout(namespace:string, key:string):void {
        if (isDefined(this._timers[namespace]) &&
            isDefined(this._timers[namespace][key])) {
            clearTimeout(this._timers[namespace][key]);
            delete this._timers[namespace][key];
        }
    }

    private _setupTimeout(namespace:string, key:string, ttl:number):void {
        if (isNumber(ttl) && !isNaN(ttl) && ttl >= 0) {
            if (!isDefined(this._timers[namespace])) {
                this._timers[namespace] = {};
            }
            this._timers[namespace][key] = setTimeout(():void => {
                this.removeItem(namespace, key);
            }, ttl);
            this._timers[namespace][key].ref();
        }
    }

    constructor(options:IOptions) {
        super(options);
    }

    public getNamespaces():string[] {
        return Object.keys(this._memory);
    }

    public hasNamespace(namespace:string):boolean {
        return isDefined(this._memory[namespace]);
    }

    public removeNamespace(namespace:string):void {
        var property:string;
        if (isDefined(this._memory[namespace])) {
            delete this._memory[namespace];
        }
        if (isDefined(this._timers[namespace])) {
            for (property in this._timers[namespace]) {
                if (!this._timers[namespace].hasOwnProperty(property)) {
                    continue;
                }
                this._removeTimeout(namespace, property);
            }
            delete this._timers[namespace];
        }
    }

    public getInfo():IInformation {
        return <IInformation>{
            pid         : process.pid,
            gid         : process.getgid(),
            uid         : process.getuid(),
            cwd         : process.cwd(),
            arch        : process.arch,
            uptime      : process.uptime(),
            platform    : process.platform,
            version     : process.version,
            execPath    : process.execPath,
            execArgv    : process.execArgv,
            memoryUsage : process.memoryUsage()
        };
    }

    public getItem(namespace:string, key:string):any {
        if (isDefined(this._memory[namespace]) &&
            isDefined(this._memory[namespace][key])) {
            if (this._memory[namespace][key] instanceof Buffer) {
                return (<Buffer>this._memory[namespace][key]).toString("base64");
            } else if (this._memory[namespace][key] instanceof IncrementableBigIntegerHelper) {
                return (<IIncrementableBigIntegerHelper>this._memory[namespace][key]).getValue();
            }
            return this._memory[namespace][key];
        }
        return null;
    }

    public getItems(namespace:string, keys:string[]):any {
        var index:number,
            length:number = keys.length,
            result:any = {};
        for (index = 0; index < length; index++) {
            result[keys[index]] = this.getItem(namespace, keys[index]);
        }
        return result;
    }

    public getBin(namespace:string, key:string):any {
        if (isDefined(this._memory[namespace]) &&
            isDefined(this._memory[namespace][key]) &&
            this._memory[namespace][key] instanceof Buffer) {
            return this._memory[namespace][key].toString("base64");
        }
        return null;
    }

    public getBins(namespace:string, keys:string[]):any {
        var index:number,
            length:number = keys.length,
            result:any = {};
        for (index = 0; index < length; index++) {
            result[keys[index]] = this.getBin(namespace, keys[index]);
        }
        return result;
    }

    public setItem(namespace:string, key:string, value:any, ttl:number):void {
        if (!isDefined(this._memory[namespace])) {
            this._memory[namespace] = {};
        }
        this._removeTimeout(namespace, key);
        this._setupTimeout(namespace, key, ttl);
        this._memory[namespace][key] = value;
    }

    public setItems(namespace:string, data:any, ttl:number):void {
        var property:string;
        for (property in data) {
            if (!data.hasOwnProperty(property)) {
                continue;
            }
            this.setItem(namespace, property, data[property], ttl);
        }
    }

    public setBin(namespace:string, key:string, value:string|Buffer, ttl:number):void {
        if (!isDefined(this._memory[namespace])) {
            this._memory[namespace] = {};
        }
        this._removeTimeout(namespace, key);
        this._setupTimeout(namespace, key, ttl);
        this._memory[namespace][key] = new Buffer(String(value), "base64");
    }

    public setBins(namespace:string, data:{[index:string]:string}|any, ttl:number):void {
        var property:string;
        for (property in data) {
            if (!data.hasOwnProperty(property)) {
                continue;
            }
            this.setBin(namespace, property, data[property], ttl);
        }
    }

    public removeItem(namespace:string, key:string):void {
        if (isDefined(this._memory[namespace]) &&
            isDefined(this._memory[namespace][key])) {
            delete this._memory[namespace][key];
        }
        this._removeTimeout(namespace, key);
    }

    public removeItems(namespace:string, keys:string[]):void {
        var index:number,
            length:number = keys.length;
        for (index = 0; index < length; index++) {
            this.removeItem(namespace, keys[index]);
        }
    }

    public hasItem(namespace:string, key:string):boolean {
        return isDefined(this._memory[namespace]) &&
            isDefined(this._memory[namespace][key]);
    }

    public hasItems(namespace:string, keys:string[]):boolean[] {
        var index:number,
            length:number = keys.length,
            result:any = {};
        for (index = 0; index < length; index++) {
            result[keys[index]] = this.hasItem(namespace, keys[index]);
        }
        return result;
    }

    public getKey(namespace:string, index:number):string {
        if (!isDefined(this._memory[namespace])) {
            return null;
        }
        return Object.keys(this._memory[namespace])[index] || null;
    }

    public getKeys(namespace:string, indexes:number[]):string[] {
        var index:number,
            length:number = indexes.length,
            result:string[] = [],
            keys:string[] = Object.keys(this._memory[namespace]);
        for (index = 0; index < length; index++) {
            result.push(keys[index] || null);
        }
        return result;
    }

    public getLength(namespace:string):number {
        if (!this._memory[namespace]) {
            return 0;
        }
        return Object.keys(this._memory[namespace]).length;
    }

    public increment(namespace:string, key:string, ttl:number) {
        if (!isDefined(this._memory[namespace]) ||
            !isDefined(this._memory[namespace][key]) ||
            !(this._memory[namespace][key] instanceof IncrementableBigIntegerHelper)) {
            this._memory[namespace][key] = new IncrementableBigIntegerHelper();
        }
        this._removeTimeout(namespace, key);
        this._setupTimeout(namespace, key, ttl);
        return (<IIncrementableBigIntegerHelper>this._memory[namespace][key]).increment();
    }

    public decrement(namespace:string, key:string, ttl:number) {
        if (!isDefined(this._memory[namespace]) ||
            !isDefined(this._memory[namespace][key]) ||
            !(this._memory[namespace][key] instanceof IncrementableBigIntegerHelper)) {
            this._memory[namespace][key] = new IncrementableBigIntegerHelper();
        }
        this._removeTimeout(namespace, key);
        this._setupTimeout(namespace, key, ttl);
        return (<IIncrementableBigIntegerHelper>this._memory[namespace][key]).decrement();
    }

    public lock(namespace:string, key:string, callback?:(errors:Exception[]) => void):void {
        if (!this._locks[namespace]) {
            this._locks[namespace] = {};
        }
        if (!this._queues[namespace]) {
            this._queues[namespace] = {};
        }
        if (this._locks[namespace][key]) {
            if (!this._queues[namespace][key]) {
                this._queues[namespace][key] = [];
            }
            (<any[]>this._queues[namespace][key]).push(callback);
        } else {
            this._locks[namespace][key] = true;
            callback(null);
        }
    }

    public unlock(namespace:string, key:string):void {
        var callback:(error:Exception) => void;
        if (this._locks[namespace]) {
            delete this._locks[namespace][key];
        }
        if (this._queues[namespace][key]) {
            callback = (<((error:Exception) => void)[]>this._queues[namespace][key]).shift();
            if (isFunction(callback)) {
                this._locks[namespace][key] = true;
                setTimeout(():void => {
                    callback(null);
                }, 0).ref();
            }
            if (!(<((error:Exception) => void)[]>this._queues[namespace][key]).length) {
                delete this._queues[namespace][key];
            }
        }
    }

    protected handler(request:any, callback:(response:any) => void):void {

        function handler(response:any):void {
            if (isFunction(callback)) {
                setTimeout((): void => {
                    callback(response);
                }, 0).ref();
            }
        }

        super.handler(request, (response:any) => {

            var args:any[]     = request.args || [],
                command:string = <string>args.shift(),
                error:IException;

            try {

                switch (command) {
                    case "ping":
                        response.result = null;
                        handler(response);
                        break;
                    case "stop":
                        response.result = null;
                        handler(response);
                        this.stop();
                        break;
                    case "getNamespaces":
                        response.result = this.getNamespaces();
                        handler(response);
                        break;
                    case "hasNamespace":
                        response.result = this.hasNamespace(<string>args[0]);
                        handler(response);
                        break;
                    case "removeNamespace":
                        response.result = null;
                        this.removeNamespace(<string>args[0]);
                        handler(response);
                        break;
                    case "getInfo":
                        response.result = this.getInfo();
                        handler(response);
                        break;
                    case "getItem":
                        response.result = this.getItem(<string>args[0], <string>args[1]);
                        handler(response);
                        break;
                    case "getItems":
                        response.result = this.getItems(<string>args[0], <string[]>args[1]);
                        handler(response);
                        break;
                    case "getBin":
                        response.result = this.getBin(<string>args[0], <string>args[1]);
                        handler(response);
                        break;
                    case "getBins":
                        response.result = this.getBins(<string>args[0], <string[]>args[1]);
                        handler(response);
                        break;
                    case "setItem":
                        response.result = null;
                        this.setItem(<string>args[0], <string>args[1], <any>args[2], <number>args[3]);
                        handler(response);
                        break;
                    case "setItems":
                        response.result = null;
                        this.setItems(<string>args[0], <any>args[1], <number>args[2]);
                        handler(response);
                        break;
                    case "setBin":
                        response.result = null;
                        this.setBin(<string>args[0], <string>args[1], <any>args[2], <number>args[3]);
                        handler(response);
                        break;
                    case "setBins":
                        response.result = null;
                        this.setBins(<string>args[0], <any>args[1], <number>args[2]);
                        handler(response);
                        break;
                    case "removeItem":
                        response.result = null;
                        this.removeItem(<string>args[0], <string>args[1]);
                        handler(response);
                        break;
                    case "removeItems":
                        response.result = null;
                        this.removeItems(<string>args[0], <string[]>args[1]);
                        handler(response);
                        break;
                    case "hasItem":
                        response.result = this.hasItem(<string>args[0], <string>args[1]);
                        handler(response);
                        break;
                    case "hasItems":
                        response.result = this.hasItems(<string>args[0], <string[]>args[1]);
                        handler(response);
                        break;
                    case "getKey":
                        response.result = this.getKey(<string>args[0], <number>args[1]);
                        handler(response);
                        break;
                    case "getKeys":
                        response.result = this.getKeys(<string>args[0], <number[]>args[1]);
                        handler(response);
                        break;
                    case "getLength":
                        response.result = this.getLength(<string>args[0]);
                        handler(response);
                        break;
                    case "increment":
                        response.result = this.increment(<string>args[0], <string>args[1], <number>args[2]);
                        handler(response);
                        break;
                    case "decrement":
                        response.result = this.decrement(<string>args[0], <string>args[1], <number>args[2]);
                        handler(response);
                        break;
                    case "lock":
                        this.lock(<string>args[0], <string>args[1], (errors:Exception[]):void => {
                            response.result = null;
                            if (errors && errors.length) {
                                response.errors = errors.map((error:Exception):IObject => {
                                    return error.toObject();
                                });
                            }
                            handler(response);
                        });
                        break;
                    case "unlock":
                        response.result = null;
                        this.unlock(<string>args[0], <string>args[1]);
                        handler(response);
                        break;
                    default:
                        error = new Exception({message: "unknown command"});
                        response.errors = [error.toObject()];
                        logger.error(error.getStack());
                        handler(response);
                        break;
                }

            } catch (error) {

                response.errors = ExceptionBase.convertFromError(error).toObject();
                logger.error(ExceptionBase.convertFromError(error).getStack());
                handler(response);

            }

        });
    }

}
