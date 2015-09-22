import PluginBase = require("../Plugin");
import IPlugin = require("../IPlugin");
import Name = require("../../Name");
import LessPlugin = require("less-plugin-csscomb");

class Plugin extends PluginBase implements IPlugin {

    public getName():Name {
        return Name.CSSCOMB;
    }

    private _config:string = "csscomb"; // todo: csscomb (default), zen or yandex

    public getConfig():string {
        return this._config;
    }

    public setConfig(value:string):void {
        this._config = value; // todo: check value
    }

    public getInstance():any {
        return new LessPlugin(this.getConfig());
    }

}

export = Plugin;
