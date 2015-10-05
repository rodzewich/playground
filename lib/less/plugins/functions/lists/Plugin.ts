import PluginBase = require("../Plugin");
import IPlugin = require("../IPlugin");
import Name = require("../../Name");
import LessPlugin = require("less-plugin-lists");

class Plugin extends PluginBase implements IPlugin {

    public getName():Name {
        return Name.LISTS;
    }

    public getInstance():any {
        return new LessPlugin();
    }

}

export = Plugin;
