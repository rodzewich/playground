import PluginBase = require("../Plugin");
import IPlugin = require("../IPlugin");
import Name = require("../../Name");
import LessPlugin = require("less-plugin-autoprefix");
import browserslist = require("browserslist");

class Plugin extends PluginBase implements IPlugin {

    public getName():Name {
        return Name.AUTOPREFIX;
    }

    private _browsers:string[] = browserslist.defaults;

    public getBrowsers():string[] {
        return this._browsers;
    }

    public setBrowsers(value:string[]):void {
        this._browsers = value;
    }

    public getInstance():any {
        return new LessPlugin({browsers: this.getBrowsers()});
    }

}

export = Plugin;
