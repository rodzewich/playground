import ExceptionBase = require("../compiler/Exception");

class Exception extends ExceptionBase {

    constructor(message?:string) {
        super(message);
        ExceptionBase.captureStackTrace(this, Exception);
    }

}

export = Exception;
