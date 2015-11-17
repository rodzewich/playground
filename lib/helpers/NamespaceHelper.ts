import {isArray, isString, isDefined} from "../utils";
import Separator        = require("./Separator");
import {Exception} from "../exception";
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

    public setNamespace(namespace:string[]):INamespaceHelper {
        if (!isArray(namespace) || !namespace.length) {
            throw new Exception({message: "namespace should be a non empty strings array"});
        }
        namespace.forEach((item:string):void => {
            if (!isString(item) || !/^[a-z][a-z0-9]*$/i.test(item)) {
                throw new Exception({message: "namespace is invalid"});
            }
        });
        this._namespace = namespace;
        return this;
    }

    public addToNamespace(namespace:string[]):INamespaceHelper {
        if (!isArray(namespace) || !namespace.length) {
            throw new Exception({message: "namespace should be a non empty strings array"});
        }
        namespace.forEach((item:string):void => {
            if (!isString(item) || !/^[a-z][a-z0-9]*$/i.test(item)) {
                throw new Exception({message: "namespace is invalid"});
            }
        });
        namespace.forEach((item:string):void => {
            this._namespace.push(item);
        });
        return this;
    }

    public getSeparator():Separator {
        return this._separator;
    }

    public setSeparator(separator:Separator):INamespaceHelper {
        if (!(separator instanceof Separator)) {
            throw new Exception({message: "separator is invalid"});
        }
        this._separator = separator;
        return this;
    }

    public static parse(namespace:string, separator:Separator = Separator.DOT):NamespaceHelper {
        return new NamespaceHelper(String(namespace).split(separator.getValue()), separator);
    }

}

export = NamespaceHelper;
