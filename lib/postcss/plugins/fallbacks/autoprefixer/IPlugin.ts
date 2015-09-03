import IPluginBase = require("../IPlugin");

interface IPlugin extends IPluginBase {
    getBrowsers():string[];
    setBrowsers(value:string[]):void;
    isCascade():boolean;
    getIsCascade():boolean;
    setIsCascade(value:boolean):void;
    isAdd():boolean;
    getIsAdd():boolean;
    setIsAdd(value:boolean):void;
    isRemove():boolean;
    getIsRemove():boolean;
    setIsRemove(value:boolean):void;
}

export = IPlugin;
