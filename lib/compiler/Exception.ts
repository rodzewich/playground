import BaseException = require("../Exception");

class Exception extends BaseException {

    constructor(message?:string) {
        super(message);
        BaseException.captureStackTrace(this, Exception);
    }

}

export = Exception;
