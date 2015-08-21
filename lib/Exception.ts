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
        if (message) {
            this.message = message;
        }
    }

    public getName():string {
        return this.name;
    }

    public getMessage():string {
        return this.message;
    }

    public static captureStackTrace(error:any, func:any):void {
        Error.captureStackTrace(error, func);
    }

}

export = Exception;
