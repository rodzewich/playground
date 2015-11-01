import IMemoryTimeoutHelper = require("./IMemoryTimeoutHelper");
import TimeoutHelper = require("../../helpers/TimeoutHelper");

class MemoryTimeoutHelper extends TimeoutHelper implements IMemoryTimeoutHelper {
}

export = MemoryTimeoutHelper;
