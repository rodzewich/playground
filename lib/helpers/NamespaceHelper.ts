import isArray          = require("../isArray");
import isString         = require("../isString");
import isDefined        = require("../isDefined");
import Separator        = require("./Separator");
import Exception        = require("../exception/Exception");
import INamespaceHelper = require("./INamespaceHelper");

class NamespaceHelper implements INamespaceHelper {

    private _namespace:string[] = ["default"];

    private _separator:Separator = Separator.DOT;

    constructor(namespace?:string[], separator?:Separator) {
        if (isDefined(namespace)) {
            this.setNamespace(namespace);
        }
        if (isDefined(separator)) {
            this.setSeparator(separator);
        }
    }

    public getValue():string {
        return this._namespace.join(this._separator.toString());
    }

    public getNamespace():string[] {
        return this._namespace.slice(0);
    }

    public setNamespace(namespace:string[]):void {
        if (!isArray(namespace) || !namespace.length) {
            throw new Exception({message: "namespace should be not empty string array"});
        }
        namespace.forEach((item:string):void => {
            if (!isString(item) || !/^[a-z][a-z0-9]$/i.test()) {
                throw new Exception({message: "namespace is invalid"});
            }
        });
        this._namespace = namespace;
    }

    public getSeparator():Separator {
        return this._separator;
    }

    public setSeparator(separator:Separator):void {
        if (!(separator instanceof Separator)) {
            throw new Exception({message: "separator is invalid"});
        }
        this._separator = separator;
    }

}

export = NamespaceHelper;
