import IPluginBase = require("../IPlugin");

interface IPlugin extends IPluginBase {
    isPreserveHacks():boolean;
    getIsPreserveHacks():boolean;
    setIsPreserveHacks(value:boolean):void;
    isRemoveAllComments():boolean;
    getIsRemoveAllComments():boolean;
    setIsRemoveAllComments(value:boolean):void;
}

export = IPlugin;
