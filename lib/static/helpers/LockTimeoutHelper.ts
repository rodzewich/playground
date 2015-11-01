import ILockTimeoutHelper = require("./ILockTimeoutHelper");
import TimeoutHelper = require("../../helpers/TimeoutHelper");

class LockTimeoutHelper extends TimeoutHelper implements ILockTimeoutHelper {
}

export = LockTimeoutHelper;
