import Separator = require("./Separator");

interface INamespaceHelper {
    getValue():string;
    getNamespace():string[];
    setNamespace(namespace:string[]):void;
    getSeparator():Separator;
    setSeparator(separator:Separator):void;
}

export = INamespaceHelper;
