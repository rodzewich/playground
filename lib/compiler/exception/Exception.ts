import {Exception as ExceptionBase} from "../../exception";
import IOptions = require("./IOptions");
import IException = require("./IException");

class Exception extends ExceptionBase implements IException {
    constructor(options:IOptions) {
        super(options);
    }
}

export = Exception;
