import IResourceLocation = require("./IResourceLocation");

class ResourceLocation implements IResourceLocation {

    private _location:string = "";

    public getLocation():string {
        return this._location;
    }

    public setLocation(value:string):void {
        this._location = value;
    }


}

export = ResourceLocation;
