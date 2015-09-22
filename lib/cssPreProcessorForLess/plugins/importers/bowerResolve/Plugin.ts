import PluginBase = require("../Plugin");
import IPlugin = require("../IPlugin");
import Name = require("../../Name");
import LessPlugin = require("less-plugin-bower-resolve");

class Plugin extends PluginBase implements IPlugin {

    public getName():Name {
        return Name.BOWER_RESOLVE;
    }

    public getInstance():any {
        return new LessPlugin();
    }

}

export = Plugin;
