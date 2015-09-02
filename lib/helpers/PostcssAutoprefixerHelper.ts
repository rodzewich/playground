/// <reference path="./IPostcssAutoprefixerHelper.ts" />
/// <reference path="./PostcssHelper.ts" />

import IPostcssAutoprefixerHelper = require("./IPostcssAutoprefixerHelper");
import PostcssHelper = require("./PostcssHelper");
import postcssAutoprefixer = require("autoprefixer-core");
import browserslist = require("browserslist");

class PostcssAutoprefixerHelper extends PostcssHelper implements IPostcssAutoprefixerHelper {

    private _browsers:string[] = browserslist.defaults;

    private _cascade:boolean = true;

    private _add:boolean = true;

    private _remove:boolean = true;

    public getBrowsers():string[] {
        return this._browsers;
    }

    public setBrowsers(value:string[]):void {
        this._browsers = value;
    }

    public isCascade():boolean {
        return this.getCascade();
    }

    public getCascade():boolean {
        return this._cascade;
    }

    public setCascade(value:boolean):void {
        this._cascade = value;
    }

    public isAdd():boolean {
        return this.getAdd();
    }

    public getAdd():boolean {
        return this._add;
    }

    public setAdd(value:boolean):void {
        this._add = value;
    }

    public isRemove():boolean {
        return this.getRemove();
    }

    public getRemove():boolean {
        return this._remove;
    }

    public setRemove(value:boolean):void {
        this._remove = value;
    }

    public getInstance():any {
        return postcssAutoprefixer({
            add: this.isAdd(),
            remove: this.isRemove(),
            cascade: this.isCascade(),
            browsers: this.getBrowsers()
        });
    }
}

export = PostcssAutoprefixerHelper;
