import ExceptionBase = require("../../exception/Exception");
import Exception     = require("../exception/Exception");
import BaseDaemon    = require("../../daemon/Daemon");
import isFunction    = require("../../isFunction");
import IDaemon       = require("./IDaemon");
import IOptions      = require("./IOptions");
import log4js        = require("../../../logger");

var logger:log4js.Logger = log4js.getLogger("memory");

// todo: 1. добавить логирование!

class Daemon extends BaseDaemon implements IDaemon {

    private _memory:any = {};

    private _locks:any = {};

    private _queues:any = {};

    constructor(options:IOptions) {
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
        var property:string;
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
        var index:number,
            length:number;
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

        function handler(response:any):void {
            if (isFunction(callback)) {
                setTimeout((): void => {
                    callback(response);
                }, 0);
            }
        }

        super.handler(request, (response:any) => {

            var args:any[]     = request.args || [],
                command:string = <string>args.shift(),
                error:IException;

            try {

                switch (command) {
                    case "ping":
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
                    case "setItem":
                        response.result = null;
                        this.setItem(<string>args[0], <string>args[1], <any>args[2]);
                        handler(response);
                        break;
                    case "setItems":
                        response.result = null;
                        this.setItems(<string>args[0], <any>args[1]);
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
                    case "lock":
                        response.result = null;
                        this.lock(<string>args[0], <string>args[1], (error?:Error):void => {
                            if (error) {
                                response.errors = error;
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

export = Daemon;
