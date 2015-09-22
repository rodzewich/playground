import PluginBase = require("../Plugin");
import IPlugin = require("../IPlugin");
import Name = require("../../Name");
import LessPlugin = require("less-plugin-autoprefix");

class Plugin extends PluginBase implements IPlugin {

    public getName():Name {
        return Name.AUTOPREFIX;
    }

    public getInstance():any {
        return new LessPlugin();
    }

}

export = Plugin;
