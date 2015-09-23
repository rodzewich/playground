import IPluginBase = require("../IPlugin");

interface IPlugin extends IPluginBase {
    isPreserveHacks():boolean;
    getIsPreserveHacks():boolean;
    setIsPreserveHacks(value:boolean):void;
    isRemoveAllComments():boolean;
    getIsRemoveAllComments():boolean;
    setIsRemoveAllComments():boolean;
}

export = IPlugin;
