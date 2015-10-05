import IOptions = require("./IOptions");
import IException = require("./IException");
import isDefined = require("../isDefined");

declare class Error {
    static captureStackTrace(error:any, func:any):void;
}

class Exception implements IException {

    private _message:string = "undefined";

    private _code:number = 0;

    private _stack:string = "";

    protected _class:any = Exception;

    protected _name:string = "Exception";

    constructor(options:IOptions, place?:any) {
        var temp:any = new Error();
        if (options && isDefined(options.message)) {
            this._message = String(options.message);
        }
        if (options && isDefined(options.code)) {
            this._code = Math.max(0, parseInt(String(options.code), 10)) || 0;
        }
        Error.captureStackTrace(temp, place || this._class);
        this._stack = String(temp.stack).split("\n").slice(1).join("\n");
    }

    public get stack():string {
        return this.getStack();
    }

    public set stack(value:string) {
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

}

export = Exception;
