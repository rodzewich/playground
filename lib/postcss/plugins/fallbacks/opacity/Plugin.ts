/// <reference path="./plugin.d.ts" />

import PluginBase = require("../Plugin");
import IPlugin = require("./IPlugin");
import IOptions = require("./IOptions");
import postcssOpacity = require("postcss5-opacity");

class Plugin extends PluginBase implements IPlugin {

    public getInstance():any {
        return postcssOpacity;
    }

}

export = Plugin;
