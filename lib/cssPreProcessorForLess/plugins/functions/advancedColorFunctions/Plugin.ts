import PluginBase = require("../Plugin");
import IPlugin = require("../IPlugin");
import Name = require("../../Name");
import LessPlugin = require("less-plugin-advanced-color-functions");

class Plugin extends PluginBase implements IPlugin {

    public getName():Name {
        return Name.ADVANCED_COLOR_FUNCTIONS;
    }

    public getInstance():any {
        return new LessPlugin();
    }

}

export = Plugin;
