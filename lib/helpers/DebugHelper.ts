import isTrue       = require("../isTrue");
import isDefined    = require("../isDefined");
import IDebugHelper = require("./IDebugHelper");

class DebugHelper implements IDebugHelper {

    private _debug:boolean = false;

    constructor(value?:boolean) {
        if (isDefined(value)) {
            this.setIsDebug(value);
        }
    }

    public isDebug():boolean {
        return this.getIsDebug();
    }

    public getIsDebug():boolean {
        return this._debug;
    }

    public setIsDebug(value:boolean):void {
        this._debug = isTrue(value);
    }

}

export = DebugHelper;
