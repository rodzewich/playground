import IObject = require("./IObject");
import IOptions = require("./IOptions");
import IException = require("./IException");
import isDefined = require("../isDefined");
import isObject = require("../isObject");

declare class Error {
    static captureStackTrace(error:any, func:any):void;
}

class Exception implements IException {

    private _message:string = "undefined";

    private _code:number = 0;

    private _type:string = null;

    private _stack:string = "";

    protected _class:any = Exception;

    protected _name:string = "Exception";

    protected _data:{[index:string]:any} = {};

    constructor(options:IOptions, place?:any) {
        var temp:any = new Error(),
            property:string;
        if (options && isDefined(options.message)) {
            this._message = String(options.message);
        }
        if (options && isDefined(options.code)) {
            this._code = Math.max(0, parseInt(String(options.code), 10)) || 0;
        }
        Error.captureStackTrace(temp, place || this._class);
        if (options && isDefined(options.stack)) {
            this._stack = String(options.stack);
        } else {
            this._stack = String(temp.stack).split("\n").slice(1).join("\n");
        }
        if (options && isDefined(options.name)) {
            this._name = String(options.name);
        }
        if (options && isDefined(options.type)) {
            this._type = String(options.type)
                .replace(/[^a-z0-9]/i, "")
                .replace(/([a-z])([A-Z])/g, "$1_$2")
                .toUpperCase();
        }
        if (!this._type) {
            this._type = this.getName()
                .replace(/[^a-z0-9]/i, "")
                .replace(/([a-z])([A-Z])/g, "$1_$2")
                .toUpperCase();
        }
        if (options && isObject(options.data)) {
            for (property in options.data) {
                if (!options.data.hasOwnProperty(property)) {
                    continue;
                }
                this._data[property] = options.data[property];
            }
        }
    }

    public get name():string {
        return this.getName();
    }

    public set name(value:string) {
    }

    public get message():string {
        return this.getMessage();
    }

    public set message(value:string) {
    }

    public get code():number {
        return this.getCode();
    }

    public set code(value:number) {
    }

    public get type():string {
        return this.getType();
    }

    public set type(value:string) {
    }

    public get data():{[index:string]:any} {
        return this.getData();
    }

    public set data(value:{[index:string]:any}) {
    }

    public get stack():string {
        return this.getStack();
    }

    public set stack(value:string) {
    }

    public toObject():IObject {
        return <IObject>{
            message: this.getMessage(),
            stack: this.getStack(),
            name: this.getName(),
            code: this.getCode()
        };
    }

    public toString():string {
        return this.getName() + ": " + this.getMessage();
    }

    public getName():string {
        return this._name;
    }

    public getStack():string {
        return [this.toString(), this._stack].join("\n");
    }

    public getMessage():string {
        return this._message;
    }

    public getCode():number {
        return this._code;
    }

    public getType():string {
        return this._type;
    }

    public getData():{[index:string]:any} {
        return this._data;
    }

    public static convertFromError(error:any, data:{[index:string]:any}):IException {
        return new Exception({
            name    : error.name,
            message : error.message,
            stack   : error.stack,
            code    : error.code,
            type    : error.type,
            data    : data
        });
    }

}

export = Exception;
