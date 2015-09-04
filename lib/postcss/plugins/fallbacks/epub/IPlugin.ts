import IPluginBase = require("../IPlugin");

interface IPlugin extends IPluginBase {
    isFonts():boolean;
    getIsFonts():boolean;
    setIsFonts(value:boolean):void;
    isStrip():boolean;
    getIsStrip():boolean;
    setIsStrip(value:boolean):void;
    isStrict():boolean;
    getIsStrict():boolean;
    setIsStrict(value:boolean):void;
}

export = IPlugin;
