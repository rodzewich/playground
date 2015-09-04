import typeOf = require("../../../../typeOf");
import PluginBase = require("../Plugin");
import IPlugin = require("./IPlugin");
import IOptions = require("./IOptions");
import cssgrace = require("cssgrace");

class Plugin extends PluginBase implements IPlugin {

    public getInstance():any {
        return cssgrace;
    }

}

export = Plugin;
