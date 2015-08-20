/// <reference path="../../types/node/node.d.ts" />

class Exception extends Error {

    public name: string = "Exception";

    public message: string;

    constructor(message: string) {
        super(message);
        this.message = message;
        (<(error:Exception, func:any) => void>Error['captureStackTrace']).call(Error, this, Exception);
    }

    public getMessage(): string {
        return this.message;
    }

}

export = Exception;
