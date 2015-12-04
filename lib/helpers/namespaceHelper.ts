import {isArray, isString, isDefined} from "../utils/common";
import {Exception} from "../exception";

export class SeparatorHelper {

    private _name:string;

    private _value:string;

    constructor(name:string, value:string) {
        this._name = name;
        this._value = value;
    }

    public getName():string {
        return this._name;
    }

    public getValue():string {
        return this._value;
    }

    public toString():string {
        return this.getValue();
    }

    public static DOT:SeparatorHelper = new SeparatorHelper("DOT", ".");

    public static COLON:SeparatorHelper = new SeparatorHelper("COLON", "::");

    public static ARROW:SeparatorHelper = new SeparatorHelper("ARROW", "->");

}

export interface INamespaceHelper {
    getValue():string;
    getNamespace():string[];
    setNamespace(namespace:string[]):INamespaceHelper;
    addToNamespace(namespace:string[]):INamespaceHelper;
    getSeparator():SeparatorHelper;
    setSeparator(separator:SeparatorHelper):INamespaceHelper;
}

export class NamespaceHelper implements INamespaceHelper {

    private _namespace:string[] = ["default"];

    private _separator:SeparatorHelper = SeparatorHelper.DOT;

    constructor(namespace?:string[], separator?:SeparatorHelper) {
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

    public getSeparator():SeparatorHelper {
        return this._separator;
    }

    public setSeparator(separator:SeparatorHelper):INamespaceHelper {
        if (!(separator instanceof SeparatorHelper)) {
            throw new Exception({message: "separator is invalid"});
        }
        this._separator = separator;
        return this;
    }

    public static parse(namespace:string, separator:SeparatorHelper = SeparatorHelper.DOT):NamespaceHelper {
        return new NamespaceHelper(String(namespace).split(separator.getValue()), separator);
    }

}
