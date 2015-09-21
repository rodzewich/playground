import PluginBase = require("../Plugin");
import IPlugin = require("./IPlugin");
import Category = require("../Category");

abstract class Plugin extends PluginBase implements IPlugin {
}

export = Plugin;
