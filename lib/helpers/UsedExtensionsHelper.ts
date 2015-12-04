import {isNull, isArray, isString, isDefined} from "../utils/common";
import {Exception} from "../exception";
import IUsedExtensionsHelper = require("./IUsedExtensionsHelper");

class UsedExtensionsHelper implements IUsedExtensionsHelper {

    protected _extensions:string[] = [];

    constructor(extensions?:string[]) {
        if (isDefined(extensions)) {
            this.setExtensions(extensions);
        }
    }

    public clear():void {
        this._extensions.splice(0, this._extensions.length);
    }

    public getExtensions():string[] {
        return this._extensions.slice(0);
    }

    public setExtensions(extensions:string[]):void {
        this.clear();
        if (isArray(extensions)) {
            extensions.forEach((extension:string):void => {
                if (!isString(extension) || !/^[a-z][a-z0-9]*$/i.test(extension)) {
                    this.clear();
                    throw new Exception({message: "extensions should be a non empty strings array"});
                }
                this._extensions.push(extension.toLowerCase());
            });
        } else if (!isNull(extensions)) {
            throw new Exception({message: "extensions should be a non empty strings array"});
        }
    }

}

export = UsedExtensionsHelper;
