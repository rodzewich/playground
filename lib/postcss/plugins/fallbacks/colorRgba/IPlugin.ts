import IPluginBase = require("../IPlugin");

interface IPlugin extends IPluginBase {
    getProperties():string[];
    setProperties(value:string[]):void;
}

export = IPlugin;
