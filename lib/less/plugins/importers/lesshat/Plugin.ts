import PluginBase = require("../Plugin");
import IPlugin = require("../IPlugin");
import Name = require("../../Name");
import LessPlugin = require("less-plugin-lesshat");

class Plugin extends PluginBase implements IPlugin {

    public getName():Name {
        return Name.LESSHAT;
    }

    public getInstance():any {
        return new LessPlugin();
    }

}

export = Plugin;
