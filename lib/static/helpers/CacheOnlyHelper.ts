import ICacheOnlyHelper = require("./ICacheOnlyHelper");
import {isDefined, isTrue} from "../../utils";

class CacheOnlyHelper implements ICacheOnlyHelper {

    private _used:boolean = false;

    constructor(value?:boolean) {
        if (isDefined(value)) {
            this.setIsUsed(value);
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

}

export = CacheOnlyHelper;
