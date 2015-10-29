import isDefined = require("../isDefined");
import isNull    = require("../isNull");
import isArray   = require("../isArray");
import isString  = require("../isString");
import Exception = require("../exception/Exception");
import IIncludeDirectoriesHelper = require("./IIncludeDirectoriesHelper");

class IncludeDirectoriesHelper implements IIncludeDirectoriesHelper {

    private _directories:string[] = [];

    constructor(directories?:string[]) {
        if (isDefined(directories)) {
            this.setDirectories(directories);
        }
    }

    public getDirectories():string[] {
        return this._directories.slice(0);
    }

    public setDirectories(directories:string[]):void {
        if (isNull(directories)) {
            this._directories.splice(0, this._directories.length);
        } else if (!isArray(directories)) {
            throw new Exception({message: "directories should be a non empty strings array"});
        } else {
            this._directories.splice(0, this._directories.length);
            directories.forEach((directory:string):void => {
                if (!isString(directory) || !directory) {
                    this._directories.splice(0, this._directories.length);
                    throw new Exception({message: "directories should be a non empty strings array"});
                }
                this._directories.push(directory);
            });
        }
    }

}

export = IncludeDirectoriesHelper;