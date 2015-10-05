import PluginBase = require("../Plugin");
import IPlugin = require("../IPlugin");
import Name = require("../../Name");
import LessPlugin = require("less-plugin-ionic");

class Plugin extends PluginBase implements IPlugin {

    public getName():Name {
        return Name.IONIC;
    }

    public getInstance():any {
        return new LessPlugin();
    }

}

export = Plugin;
