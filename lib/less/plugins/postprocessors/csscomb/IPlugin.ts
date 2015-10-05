import IPluginBase = require("../IPlugin");

interface IPlugin extends IPluginBase {
    setConfig(value:string):void;
    getConfig():string;
}

export = IPlugin;
