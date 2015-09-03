import isTrue = require("../../isTrue");
import typeOf = require("../../typeOf");
import IPlugin = require("./IPlugin");
import IOptions = require("./IOptions");

abstract class Plugin implements IPlugin {

    private _used:boolean = true;

    private _enabled:boolean = true;

    constructor(options?:IOptions) {
        if (options && typeOf(options.used) !== "undefined") {
            this.setIsUsed(options.used);
        }
        if (options && typeOf(options.enabled) !== "undefined") {
            this.setIsEnabled(options.enabled);
        }
    }

    public isUsed():boolean {
        return this.getIsUsed();
    }

    public getIsUsed():boolean {
        return this._used;
    }

    public setIsUsed(value:boolean):void {
        this._used = isTrue(value);
    }

    public isEnabled():boolean {
        return this.getIsEnabled();
    }

    public getIsEnabled():boolean {
        return this._enabled;
    }

    public setIsEnabled(value:boolean):void {
        this._enabled = isTrue(value);
    }

    abstract getInstance():any;

}

export = Plugin;