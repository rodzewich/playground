import IPluginBase = require("../IPlugin");

interface IPlugin extends IPluginBase {
    setBrowsers(value:string[]):void;
    getBrowsers():string[];
}

export = IPlugin;
