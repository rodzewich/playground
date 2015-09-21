import Category = require("./Category");
import Name = require("./Name");

interface IPlugin {
    isUsed():boolean;
    getIsUsed():boolean;
    setIsUsed(value:boolean):void;
    getInstance():any;
    getCategory():Category;
    getName():Name;
}

export = IPlugin;
