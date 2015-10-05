import PluginBase = require("../Plugin");
import IPlugin = require("../IPlugin");
import Name = require("../../Name");
import LessPlugin = require("less-plugin-npm-import");

class Plugin extends PluginBase implements IPlugin {

    private _prefix:string = "npm://";

    public getPrefix():string {
        return this._prefix;
    }

    public setPrefix(value:string):void {
        this._prefix = value;
    }

    public getName():Name {
        return Name.NPM_IMPORT;
    }

    public getInstance():any {
        return new LessPlugin({prefix: this.getPrefix()});
    }

}

export = Plugin;
