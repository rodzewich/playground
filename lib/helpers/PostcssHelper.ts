/// <reference path="./IPostcssHelper.ts" />

import IPostcssHelper = require("./IPostcssHelper");

abstract class PostcssHelper implements IPostcssHelper {

    private _use:boolean = true;

    public isUsed():boolean {
        return this.getIsUse();
    }

    public getIsUse():boolean {
        return this._use;
    }

    public setIsUse(value:boolean):void {
        this._use = value;
    }

    abstract getInstance(): any;

}

export = PostcssHelper;