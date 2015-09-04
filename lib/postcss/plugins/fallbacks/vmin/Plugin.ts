import typeOf = require("../../../../typeOf");
import PluginBase = require("../Plugin");
import IPlugin = require("./IPlugin");
import IOptions = require("./IOptions");
import postcssVmin = require("postcss-vmin");

class Plugin extends PluginBase implements IPlugin {

    public getInstance():any {
        return postcssVmin;
    }

}

export = Plugin;