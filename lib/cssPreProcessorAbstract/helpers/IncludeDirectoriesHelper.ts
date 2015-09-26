import IIncludeDirectoriesHelper = require("./IIncludeDirectoriesHelper");

class IncludeDirectoriesHelper implements IIncludeDirectoriesHelper {

    private _directories:string[] = [];

    public getDirectories():string[] {
        return this._directories.slice(0);
    }

    public setDirectories(value:string[]):void {
        this._directories = value.slice(0);
    }

}

export = IncludeDirectoriesHelper;