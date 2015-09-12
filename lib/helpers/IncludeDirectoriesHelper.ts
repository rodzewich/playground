import IIncludeDirectoriesHelper = require("./IIncludeDirectoriesHelper");

class IncludeDirectoriesHelper implements IIncludeDirectoriesHelper {

    private _directories:string[] = [];

    public getDirectories():string[] {
        return this._directories;
    }

    public setDirectories(value:string[]):void {
        this._directories = value;
    }

}

export = IncludeDirectoriesHelper;