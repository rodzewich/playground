import typeOf = require("../../../../typeOf");
import PluginBase = require("../Plugin");
import IPlugin = require("./IPlugin");
import IOptions = require("./IOptions");
import postcssWillChange = require("postcss-will-change");

class Plugin extends PluginBase implements IPlugin {

    public isUsed(): boolean {
        // todo: this plugin not working with postcss 5.0 version
        return false;
    }

    public getInstance():any {
        return postcssWillChange;
    }

}

export = Plugin;
