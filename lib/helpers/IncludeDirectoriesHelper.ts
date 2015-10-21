import isDefined = require("../isDefined");
import isArray   = require("../isArray");
import Exception = require("../exception/Exception");
import IIncludeDirectoriesHelper = require("./IIncludeDirectoriesHelper");

class IncludeDirectoriesHelper implements IIncludeDirectoriesHelper {

    private _directories:string[] = [];

    constructor(directories?:string) {
        if (isDefined(directories)) {
            this.setDirectories(directories);
        }
    }

    public getDirectories():string[] {
        return this._directories.slice(0);
    }

    public setDirectories(directories:string[]):void {
        if (!isArray(directories)) {
            throw new Exception({message: "bla bla bla"});
        }
        directories.forEach((directory:string):void => {
            if (!isString(directory) || !directory) {
                throw new Exception({message: "bla bla bla"});
            }
        });
        this._directories = directories.slice(0);
    }

}

export = IncludeDirectoriesHelper;