import PluginBase = require("../Plugin");
import IPlugin = require("./IPlugin");

abstract class Plugin extends PluginBase implements IPlugin {
}

export = Plugin;
