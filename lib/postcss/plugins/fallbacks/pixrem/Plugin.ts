/// <reference path="./plugin.d.ts" />
/// <reference path="../../../browserslist.d.ts" />

import {isTrue, isDefined} from "../../../../utils";
import PluginBase = require("../Plugin");
import IPlugin = require("./IPlugin");
import IOptions = require("./IOptions");
import pixrem = require("pixrem");
import browserslist = require("browserslist");

class Plugin extends PluginBase implements IPlugin {

    private _rootFontSize:string = "16px";

    private _replace:boolean = false;

    private _atRules:boolean = false;

    private _html:boolean = true;

    private _browsers:string[] = browserslist.defaults;

    constructor(options?:IOptions) {
        super(options);
        if (options && isDefined(options.rootFontSize)) {
            this.setRootFontSize(options.rootFontSize);
        }
        if (options && isDefined(options.replace)) {
            this.setIsReplace(options.replace);
        }
        if (options && isDefined(options.atRules)) {
            this.setIsAtRules(options.atRules);
        }
        if (options && isDefined(options.html)) {
            this.setIsHtml(options.html);
        }
        if (options && isDefined(options.browsers)) {
            this.setBrowsers(options.browsers);
        }
    }

    public getRootFontSize():string {
        return this._rootFontSize;
    }

    public setRootFontSize(value:string):string {
        // todo: should be px, rem, em, %
        return this._rootFontSize;
    }

    public isReplace():boolean {
        return this.getIsReplace();
    }

    public getIsReplace():boolean {
        return this._replace;
    }

    public setIsReplace(value:boolean):void {
        this._replace = isTrue(value);
    }

    public isAtRules():boolean {
        return this.getIsAtRules();
    }

    public getIsAtRules():boolean {
        return this._atRules;
    }

    public setIsAtRules(value:boolean):void {
        this._atRules = isTrue(value);
    }

    public isHtml():boolean {
        return this.getIsHtml();
    }

    public getIsHtml():boolean {
        return this._html;
    }

    public setIsHtml(value:boolean):void {
        this._html = isTrue(value);
    }

    public getBrowsers():string[] {
        return this._browsers;
    }

    public setBrowsers(value:string[]):void {
        this._browsers = value;
    }

    public getInstance():any {
        return pixrem(this.getRootFontSize(), {
            replace: this.isReplace(),
            atrules: this.isAtRules(),
            html: this.isHtml(),
            browsers: this.getBrowsers()
        });
    }

}

export = Plugin;
