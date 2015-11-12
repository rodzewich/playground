import {isTrue} from "../../utils";
import ICacheHelper = require("./ICacheHelper");

class CacheHelper implements ICacheHelper {

    private _use:boolean = false;

    public setIsUsed(value:any):void {
        this._use = isTrue(value);
    }

    public getIsUsed():boolean {
        return !!this._use;
    }

    public isUsed():boolean {
        return this.getIsUsed();
    }

}

export = CacheHelper;
