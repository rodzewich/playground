/// <reference path="../../daemon/Daemon.ts" />
/// <reference path="./IDaemon.ts" />
/// <reference path="./IOptions.ts" />

import BaseDaemon = require("../../daemon/Daemon");
import IDaemon = require("./IDaemon");
import IOptions = require("./IOptions");

class Daemon extends BaseDaemon implements IDaemon {

    private _memory: any = {};

    private _locks:any = {};

    private _queues:any = {};

    constructor(options: IOptions) {
        super(options);
    }

    protected getItem(namespace:string, key:string):any {
        if (this._memory[namespace] && typeof this._memory[namespace][key] !== "undefined") {
            return this._memory[namespace][key];
        }
        return null;
    }

    protected getItems(namespace:string, keys:string[]):any {
        var index:number,
            length = keys.length,
            result:any = {};
        for (index = 0; index < length; index++) {
            if (!this._memory[namespace]) {
                result[keys[index]] = null;
                continue;
            }
            result[keys[index]] = this._memory[namespace][keys[index]] || null;
        }
        return result;
    }

    protected setItem(namespace:string, key:string, value:any):void {
        if (!this._memory[namespace]) {
            this._memory[namespace] = {};
        }
        this._memory[namespace][key] = value;
    }

    protected setItems(namespace:string, data:any):void {
        var property: string;
        if (!this._memory[namespace]) {
            this._memory[namespace] = {};
        }
        for (property in data) {
            if (!data.hasOwnProperty(property)) {
                continue;
            }
            this._memory[namespace][property] = data[property];
        }
    }

    protected removeItem(namespace:string, key:string):void {
        if (this._memory[namespace]) {
            delete this._memory[namespace][key];
        }
    }

    protected removeItems(namespace:string, keys:string[]):void {
        var index: number,
            length: number;
        if (this._memory[namespace]) {
            length = keys.length;
            for (index = 0; index < length; index++) {
                delete this._memory[namespace][keys[index]];
            }
        }
    }

    protected hasItem(namespace:string, key:string):boolean {
        return !!(this._memory[namespace] && this._memory[namespace][key]);
    }

    protected hasItems(namespace:string, keys:string[]):boolean[] {
        var index:number,
            length:number = keys.length,
            result:any = {};
        for (index = 0; index < length; index++) {
            if (!this._memory[namespace]) {
                result[keys[index]] = false;
                continue;
            }
            result[keys[index]] = typeof this._memory[namespace][keys[index]] !== "undefined";
        }
        return result;
    }

    protected getKey(namespace:string, index:number):string {
        if (!this._memory[namespace]) {
            return null;
        }
        return Object.keys(this._memory[namespace])[index];
    }

    protected getKeys(namespace:string, indexes:number[]):string[] {
        var index:number,
            length:number = indexes.length,
            result:string[] = [],
            keys:string[] = Object.keys(this._memory[namespace]);
        for (index = 0; index < length; index++) {
            result.push(keys[index] || null);
        }
        return result;
    }

    protected getLength(namespace:string):number {
        if (!this._memory[namespace]) {
            return 0;
        }
        return Object.keys(this._memory[namespace]).length;
    }

    protected lock(namespace:string, key:string, callback:(error?:Error) => void):void {
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

    protected unlock(namespace:string, key:string):void {
        var callback:(error?:Error) => void;
        if (this._locks[namespace]) {
            delete this._locks[namespace][key];
        }
        if (this._queues[namespace][key]) {
            callback = (<((error?:Error) => void)[]>this._queues[namespace][key]).shift();
            if (typeof callback === "function") {
                this._locks[namespace][key] = true;
                callback(null);
            }
            if (!(<((error?:Error) => void)[]>this._queues[namespace][key]).length) {
                delete this._queues[namespace][key];
            }
        }
    }

    protected handler(request:any, callback:(response:any) => void):void {
        super.handler(request, (response:any) => {
            var args: any[] = request.args || [],
                namespace: string = <string>args.shift(),
                command: string = <string>args.shift();
            switch (command) {
                case "getItem":
                    response.result = this.getItem(namespace, <string>args[0]);
                    callback(response);
                    break;
                case "getItems":
                    response.result = this.getItems(namespace, <string[]>args[0]);
                    callback(response);
                    break;
                case "setItem":
                    response.result = null;
                    this.setItem(namespace, <string>args[0], <any>args[1]);
                    callback(response);
                    break;
                case "setItems":
                    response.result = null;
                    this.setItems(namespace, <any>args[0]);
                    callback(response);
                    break;
                case "removeItem":
                    response.result = null;
                    this.removeItem(namespace, <string>args[0]);
                    callback(response);
                    break;
                case "removeItems":
                    response.result = null;
                    this.removeItems(namespace, <string[]>args[0]);
                    callback(response);
                    break;
                case "hasItem":
                    response.result = this.hasItem(namespace, <string>args[0]);
                    callback(response);
                    break;
                case "hasItems":
                    response.result = this.hasItems(namespace, <string[]>args[0]);
                    callback(response);
                    break;
                case "getKey":
                    response.result = this.getKey(namespace, <number>args[0]);
                    callback(response);
                    break;
                case "getKeys":
                    response.result = this.getKeys(namespace, <number[]>args[0]);
                    callback(response);
                    break;
                case "getLength":
                    response.result = this.getLength(namespace);
                    callback(response);
                    break;
                case "lock":
                    response.result = null;
                    this.lock(namespace, <string>args[0], (error?:Error):void => {
                        if (error) {
                            response.error = error;
                        }
                        callback(response);
                    });
                    break;
                case "unlock":
                    response.result = null;
                    this.unlock(namespace, <string>args[0]);
                    callback(response);
                    break;
                default:
                    // todo: use WrapperException
                    response.error = {
                        message: "Command not found"
                    };
                    callback(response);
                    break;
            }
        });
    }

}

export = Daemon;
