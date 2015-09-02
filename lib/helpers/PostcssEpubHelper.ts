/// <reference path="./IPostcssEpubHelper.ts" />

import IPostcssEpubHelper = require("./IPostcssEpubHelper");
import postcssEpub = require("postcss-epub");

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

    public isFonts():boolean {
        return this.getFonts();
    }

    public getFonts():boolean {
        return this._fonts;
    }

    public setFonts(value:boolean):void {
        this._fonts = value;
    }

    public isStrip():boolean {
        return this.getStrip();
    }

    public getStrip():boolean {
        return this._strip;
    }

    public setStrip(value:boolean):void {
        this._strip = value;
    }

    public isStrict():boolean {
        return this.getStrict();
    }

    public getStrict():boolean {
        return this._strict;
    }

    public setStrict(value:boolean):void {
        this._strict = value;
    }

    public getInstance():any {
        return postcssEpub({
            fonts: this.isFonts(),
            strip: this.isStrip(),
            strict: this.isStrict()
        });
    }

}

export = PostcssEpubHelper;
