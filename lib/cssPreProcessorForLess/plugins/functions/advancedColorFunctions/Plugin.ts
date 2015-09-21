import PluginBase = require("../Plugin");
import IPlugin = require("../IPlugin");
import Name = require("../../Name");
import LessPlugin = require("less-plugin-advanced-color-functions");

class Plugin extends PluginBase implements IPlugin {

    public getName():string {
        return Name.ADVANCED_COLOR_FUNCTIONS.getName();
    }

    public getInstance():any {
        return new LessPlugin();
    }

}

export = Plugin;
