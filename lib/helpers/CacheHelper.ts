/// <reference path="../isTrue.ts" />
/// <reference path="./ICacheHelper.ts" />

import isTrue = require("../isTrue");
import ICacheHelper = require("./ICacheHelper");

class CacheHelper implements ICacheHelper {

    private _use:boolean = false;

    public setUse(value:any):void {
        this._use = isTrue(value);
    }

    public getUse():boolean {
        return !!this._use;
    }

    public isUse():boolean {
        return this.getUse();
    }

}

export = CacheHelper;
