/// <reference path="./plugin.d.ts" />

import typeOf = require("../../../../typeOf");
import PluginBase = require("../Plugin");
import IPlugin = require("./IPlugin");
import IOptions = require("./IOptions");
//import postcssVmin = require("postcss-vmin"); // todo fix this

class Plugin extends PluginBase implements IPlugin {

    public isUsed(): boolean {
        // todo: fix this
        return false;
    }

    public getInstance():any {
        return postcssVmin;
    }

}

export = Plugin;