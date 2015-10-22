import Separator = require("./Separator");

interface INamespaceHelper {
    getValue():string;
    getNamespace():string[];
    setNamespace(namespace:string[]):INamespaceHelper;
    addToNamespace(namespace:string[]):INamespaceHelper;
    getSeparator():Separator;
    setSeparator(separator:Separator):INamespaceHelper;
}

export = INamespaceHelper;
