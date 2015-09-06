/// <reference path="./plugin.d.ts" />

import typeOf = require("../../../../typeOf");
import PluginBase = require("../Plugin");
import IPlugin = require("./IPlugin");
import IOptions = require("./IOptions");
import postcssEpub = require("postcss-epub");

class Plugin extends PluginBase implements IPlugin {

    private _fonts:boolean = true;

    private _strip:boolean = true;

    private _strict:boolean = true;

    constructor(options?: IOptions) {
        super(options);
        if (options && typeOf(options.fonts) !== "undefined") {
            this.setIsFonts(options.fonts);
        }
        if (options && typeOf(options.strip) !== "undefined") {
            this.setIsStrip(options.strip);
        }
        if (options && typeOf(options.strict) !== "undefined") {
            this.setIsStrict(options.strict);
        }
    }

    public isFonts():boolean {
        return this.getIsFonts();
    }

    public getIsFonts():boolean {
        return this._fonts;
    }

    public setIsFonts(value:boolean):void {
        this._fonts = value;
    }

    public isStrip():boolean {
        return this.getIsStrip();
    }

    public getIsStrip():boolean {
        return this._strip;
    }

    public setIsStrip(value:boolean):void {
        this._strip = value;
    }

    public isStrict():boolean {
        return this.getIsStrict();
    }

    public getIsStrict():boolean {
        return this._strict;
    }

    public setIsStrict(value:boolean):void {
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

export = Plugin;
