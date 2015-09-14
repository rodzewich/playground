import BaseException = require("./Exception");
import isDefined = require("./isDefined");
import typeOf = require("./typeOf");

declare class Error {

    public name:string;

    public message:string;

    public stack:string;

    constructor(message?:string);

    static captureStackTrace(error:any, func:any):void;

}

class Exception extends BaseException {

    private _stack: string;

    private _toString: string;

    get stack(): string {
        return this._stack;
    }

    constructor(options:any) {
        super();
        var error: Error;
        if (options && isDefined(options.name)) {
            this.name = options.name;
        }
        if (options && isDefined(options.message)) {
            this.message = options.message;
        }
        if (options && isDefined(options.asString)) {
            this._toString = options.asString;
        }
        if (options && isDefined(options.stack)) {
            this._stack = options.stack;
        } else {
            error = new Error();
            Error.captureStackTrace(error, Exception);
            this._stack = error.stack;
        }
    }

    public toString(): string {
        if (typeOf(this._toString) === "string") {
            return this._toString;
        }
        return super.toString();
    }

    public static convertToObject(error:any):any {
        return {
            name: error.name || null,
            message: error.message || null,
            stack: error.message || null,
            asString: error.toString() || null
        };
    }

}

export = Exception;
