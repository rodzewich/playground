import PluginBase = require("../Plugin");
import IPlugin = require("../IPlugin");
import Name = require("../../Name");
import LessPlugin = require("less-plugin-bootstrap");

class Plugin extends PluginBase implements IPlugin {

    public getName():Name {
        return Name.BOOTSTRAP;
    }

    public getInstance():any {
        return new LessPlugin();
    }

}

export = Plugin;
