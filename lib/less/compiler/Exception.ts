import ExceptionBase = require("../../Exception");
import ExceptionModule = require("../Exception");

class Exception extends BaseException {

    constructor(message?:string) {
        super(message);
        ExceptionBase.captureStackTrace(this, Exception);
    }

}

export = Exception;
