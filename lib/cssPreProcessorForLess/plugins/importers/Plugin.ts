import PluginBase = require("../Plugin");
import Category = require("../Category");
import IPlugin = require("./IPlugin");

abstract class Plugin extends PluginBase implements IPlugin {
}

export = Plugin;
