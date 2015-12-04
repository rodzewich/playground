/// <reference path="../../types/node/node.d.ts" />

import path = require("path");
import {isNull, isString, isDefined} from "../utils/common";
import {Exception} from "../exception";

export interface IResourceLocation {
    getLocation():string;
    setLocation(location:string):void
}

export class ResourceLocation implements IResourceLocation {

    protected _location:string = null;

    constructor(location?:string) {
        if (isDefined(location)) {
            this.setLocation(location);
        }
    }

    public getLocation():string {
        return this._location;
    }

    public setLocation(location:string):void {
        if (isNull(location)) {
            this._location = null;
        } else if (!isString(location) || !location) {
            throw new Exception({message: "location should be a non empty string"});
        } else if (!path.isAbsolute(location)) {
            throw new Exception({message: "location should be a absolute path"});
        } else {
            this._location = path.normalize(location);
        }
    }

}
