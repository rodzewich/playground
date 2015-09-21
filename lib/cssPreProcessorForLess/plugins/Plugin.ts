import IPlugin = require("./IPlugin");
import Category = require("./Category");
import Name = require("./Name");

abstract class Plugin implements IPlugin {

    private _used:boolean = true;

    public isUsed():boolean {
        return this.getIsUsed();
    }

    public getIsUsed():boolean {
        return this._used;
    }

    public setIsUsed(value:boolean):void {
        this._used = value;
    }

    public getCategory():Category {
        return this.getName().getCategory();
    }

    abstract getInstance():any;

    abstract getName():Name;

}

export = Plugin;
