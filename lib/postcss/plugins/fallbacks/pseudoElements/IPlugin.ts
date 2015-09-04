import IPluginBase = require("../IPlugin");

interface IPlugin extends IPluginBase {
    getSelectors(): string[];
    setSelectors(value:string[]): void;
}

export = IPlugin;
