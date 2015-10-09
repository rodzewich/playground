import ExceptionBase = require("../../exception/Exception");
import IException = require("./IException");
import IObject = require("./IObject");

class Exception extends ExceptionBase implements IException {

    public toObject():IObject {
        return super.toObject();
    }

}

export = Exception;
