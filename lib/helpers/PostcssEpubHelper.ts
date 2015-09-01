/// <reference path="./IPostcssEpubHelper.ts" />

import IPostcssEpubHelper = require("./IPostcssEpubHelper");

class PostcssEpubHelper implements IPostcssEpubHelper {

    private _use:boolean = false;

    private _fonts:boolean = true;

    private _strip:boolean = true;

    private _strict:boolean = true;

    public isUse():boolean {
        return this.getUse();
    }

    public getUse():boolean {
        return this._use;
    }

    public setUse(value:boolean):void {
        this._use = value;
    }

    protected isFonts():boolean {
        return this.getFonts();
    }

    protected getFonts():boolean {
        return this._fonts;
    }

    protected setFonts(value:boolean):void {
        this._fonts = value;
    }

    protected isStrip():boolean {
        return this.getStrip();
    }

    protected getStrip():boolean {
        return this._strip;
    }

    protected setStrip(value:boolean):void {
        this._strip = value;
    }

    protected isStrict():boolean {
        return this.getStrict();
    }

    protected getStrict():boolean {
        return this._strict;
    }

    protected setStrict(value:boolean):void {
        this._strict = value;
    }

}

export = PostcssEpubHelper;
