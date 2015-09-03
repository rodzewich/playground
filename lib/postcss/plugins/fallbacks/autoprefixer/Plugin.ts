import PluginBase = require("../Plugin");
import IPlugin = require("./IPlugin");
import postcssAutoprefixer = require("autoprefixer-core");
import browserslist = require("browserslist");

class Plugin extends PluginBase implements IPlugin {

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
        return this.getIsCascade();
    }

    public getIsCascade():boolean {
        return this._cascade;
    }

    public setIsCascade(value:boolean):void {
        this._cascade = value;
    }

    public isAdd():boolean {
        return this.getIsAdd();
    }

    public getIsAdd():boolean {
        return this._add;
    }

    public setIsAdd(value:boolean):void {
        this._add = value;
    }

    public isRemove():boolean {
        return this.getIsRemove();
    }

    public getIsRemove():boolean {
        return this._remove;
    }

    public setIsRemove(value:boolean):void {
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

export = Plugin;
