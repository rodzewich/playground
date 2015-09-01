/// <reference path="./INamespaceHelper.ts" />
/// <reference path="../typeOf.ts" />
/// <reference path="../Exception.ts" />

import INamespaceHelper = require("./INamespaceHelper");
import typeOf = require("../typeOf");
import Exception = require("../Exception");

class NamespaceHelper implements INamespaceHelper {

    private _value:string = "default";

    constructor(value?:string) {
        if (typeOf(value) !== "undefined") {
            this.setValue(value);
        }
    }

    public getValue():string {
        return this._value;
    }

    public setValue(value:any):void {
        var temp:string = String(value || "");
        if (!/^[a-z]\w*$/.test(temp)) {
            throw new Exception("Invalid namespace name");
        }
        this._value = temp;
    }

}

export = NamespaceHelper;
