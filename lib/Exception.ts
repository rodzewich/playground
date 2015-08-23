/// <reference path="./typeOf.ts" />

import typeOf = require("./typeOf");

declare class Error {

    public name:string;

    public message:string;

    public stack:string;

    constructor(message?:string);

    static captureStackTrace(error:any, func:any):void;

}

class Exception extends Error {

    public name:string = "Exception";

    public message:string;

    public stack:string;

    constructor(message?:string) {
        super();
        if (typeOf(message) !== "undefined") {
            this.message = message;
        }
        Exception.captureStackTrace(this, Exception);
    }

    public getName():string {
        return this.name;
    }

    public getMessage():string {
        return this.message;
    }

    public getStack():string {
        return this.stack;
    }

    public static captureStackTrace(error:any, func:any):void {
        Error.captureStackTrace(error, func);
    }

    public static getStack(error:any):void {
        return error ? error.stack || null : null;
    }

}

export = Exception;
