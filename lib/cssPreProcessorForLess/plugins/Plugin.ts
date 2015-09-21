import IPlugin = require("./IPlugin");

abstract class Plugin implements IPlugin {

    private _used:boolean = true;

    public isUsed(): boolean {
        return this.getIsUsed();
    }

    public getIsUsed(): boolean {
        return this._used;
    }

    public setIsUsed(value: boolean): void {
        this._used = value;
    }

    abstract getInstance(): any;

}

export = Plugin;