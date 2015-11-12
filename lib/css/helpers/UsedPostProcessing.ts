import {isTrue} from "../../utils";
import IUsedPostProcessing = require("./IUsedPostProcessing");

class UsedPostProcessing {

    private _used:boolean = false;

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

export = UsedPostProcessing;
