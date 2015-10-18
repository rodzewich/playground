import ExceptionBase = require("../Exception");
import CompilerException = require("../compiler/Exception");


class Exception extends CompilerException {

    constructor(message?:string) {
        super(message);
        ExceptionBase.captureStackTrace(this, Exception);
    }

}

export = Exception;
