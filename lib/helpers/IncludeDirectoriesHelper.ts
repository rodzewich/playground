import isDefined = require("../isDefined");
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
        if (!isArray(directories)) {
            throw new Exception({message: "directories should be a non empty strings array"});
        }
        directories.forEach((directory:string):void => {
            if (!isString(directory) || !directory) {
                throw new Exception({message: "directories should be a non empty strings array"});
            }
        });
        this._directories = directories.slice(0);
    }

}

export = IncludeDirectoriesHelper;