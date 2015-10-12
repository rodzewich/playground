import INamespaceHelper = require("./INamespaceHelper");
import isDefined = require("../isDefined");

class NamespaceHelper implements INamespaceHelper {

    private _value:string = "default";

    constructor(value?:string) {
        if (isDefined(value)) {
            this.setValue(value);
        }
    }

    public getValue():string {
        return this._value;
    }

    public setValue(value:any):void {
        this._value = String(value || "");
    }

}

export = NamespaceHelper;
