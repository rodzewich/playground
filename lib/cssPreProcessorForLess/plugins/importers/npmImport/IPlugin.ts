import IPluginBase = require("../IPlugin");

interface IPlugin extends IPluginBase {
    getPrefix():string;
    setPrefix(value:string):void;
}

export = IPlugin;
