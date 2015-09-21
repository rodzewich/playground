import PluginBase = require("../Plugin");
import IPlugin = require("../IPlugin");
import LessPlugin = require("less-plugin-advanced-color-functions");
import Name = require("../../Name");

class Plugin extends PluginBase implements IPlugin {

    public getName():string {
        return Name.ADVANCED_COLOR_FUNCTIONS.getName();
    }

    public getInstance():any {
        return new LessPlugin();
    }

}

export = Plugin;