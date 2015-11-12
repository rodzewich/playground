/// <reference path="./plugin.d.ts" />

import PluginBase = require("../Plugin");
import IPlugin = require("./IPlugin");
import IOptions = require("./IOptions");
import postcssWillChange = require("postcss-will-change");

class Plugin extends PluginBase implements IPlugin {

    public getInstance():any {
        return postcssWillChange;
    }

}

export = Plugin;
