import PluginBase = require("../Plugin");
import IPlugin = require("./IPlugin");
import Type = require("../Type");

abstract class Plugin extends PluginBase implements IPlugin {

    public getType():Type {
        return Type.POSTPROCESSORS;
    }

}