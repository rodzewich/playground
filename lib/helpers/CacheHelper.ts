/// <reference path="../isTrue.ts" />
/// <reference path="./ICacheHelper.ts" />

import isTrue = require("../isTrue");
import ICacheHelper = require("./ICacheHelper");

class CacheHelper implements ICacheHelper {

    private _use:boolean = false;

    public setIsUse(value:any):void {
        this._use = isTrue(value);
    }

    public getIsUse():boolean {
        return !!this._use;
    }

    public isUsed():boolean {
        return this.getIsUse();
    }

}

export = CacheHelper;
