import IPlugin = require("./IPlugin");

abstract class Plugin implements IPlugin {

    private _use:boolean = true;

    private _enabled:boolean = true;

    public isUsed():boolean {
        return this.getIsUse();
    }

    public getIsUse():boolean {
        return this._use;
    }

    public setIsUse(value:boolean):void {
        this._use = value;
    }

    public isEnabled():boolean {
        return this.getIsEnabled();
    }

    public getIsEnabled():boolean {
        return this._enabled;
    }

    public setIsEnabled(value:boolean):void {
        this._enabled = value;
    }

    abstract getInstance():any;

}

export = Plugin;