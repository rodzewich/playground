/// <reference path="./IPostcssEpubHelper.ts" />
/// <reference path="./PostcssHelper.ts" />

import IPostcssEpubHelper = require("./IPostcssEpubHelper");
import PostcssHelper = require("./PostcssHelper");
import postcssEpub = require("postcss-epub");

class PostcssEpubHelper extends PostcssHelper implements IPostcssEpubHelper {

    private _fonts:boolean = true;

    private _strip:boolean = true;

    private _strict:boolean = true;

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
