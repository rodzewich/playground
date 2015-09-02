/// <reference path="./IPostcssHelper.ts" />

import IPostcssHelper = require("./IPostcssHelper");

abstract class PostcssHelper implements IPostcssHelper {

    private _use:boolean = true;

    public isUse():boolean {
        return this.getUse();
    }

    public getUse():boolean {
        return this._use;
    }

    public setUse(value:boolean):void {
        this._use = value;
    }

    abstract getInstance(): any;

}

export = PostcssHelper;
