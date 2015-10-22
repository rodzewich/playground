import isNull    = require("../isNull");
import isArray   = require("../isArray");
import isString  = require("../isString");
import isDefined = require("../isDefined");
import Exception = require("../exception/Exception");
import IUsedExtensionsHelper = require("./IUsedExtensionsHelper");

class UsedExtensionsHelper implements IUsedExtensionsHelper {

    private _extensions:string[] = null;

    constructor(extensions?:string[]) {
        if (isDefined(extensions)) {
            this.setExtensions(extensions);
        }
    }

    public getExtensions():string[] {
        if (isNull(this._extensions)) {
            return null;
        }
        return this._extensions.slice(0);
    }

    public setExtensions(extensions:string[]):void {
        if (isNull(extensions)) {
            this._extensions = null;
        } else if (isArray(extensions)) {
            this._extensions = extensions.map((extension:string):string => {
                if (!isString(extension) || !/^[a-z][a-z0-9]*$/i.test(extension)) {
                    throw new Exception({message: "extensions should be a non empty strings array"});
                }
                return extension.toLowerCase();
            });
        } else if (isDefined(extensions)) {
            throw new Exception({message: "extensions should be a non empty strings array"});
        }
    }

}

export = UsedExtensionsHelper;
