import DaemonBase = require("../../daemon/Daemon");
import IDaemon    = require("./IDaemon");
import log4js     = require("../../../logger");

var logger:log4js.Logger = log4js.getLogger("memory");

class Daemon extends DaemonBase implements IDaemon {
}

export = Daemon;
