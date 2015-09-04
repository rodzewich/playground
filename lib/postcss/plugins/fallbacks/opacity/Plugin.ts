import typeOf = require("../../../../typeOf");
import PluginBase = require("../Plugin");
import IPlugin = require("./IPlugin");
import IOptions = require("./IOptions");
import postcssOpacity = require("postcss-opacity");

class Plugin extends PluginBase implements IPlugin {

    public getInstance():any {
        return postcssOpacity;
    }

}

export = Plugin;