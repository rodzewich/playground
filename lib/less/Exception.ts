/// <reference path="../compiler/Exception.ts" />

import BaseException = require("../compiler/Exception");

class Exception extends BaseException {

    constructor(message: string) {
        super(message);
        BaseException.captureStackTrace(this, Exception);
    }

}

export = Exception;
