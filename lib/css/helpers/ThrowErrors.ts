import {isTrue} from "../../utils/common";
import IThrowErrors = require("./IThrowErrors");

class ThrowErrors implements IThrowErrors {

    private _throw:boolean = true;

    public isThrow():boolean {
        return this.getIsThrow();
    }

    public getIsThrow():boolean {
        return this._throw;
    }

    public setIsThrow(value:boolean):void {
        this._throw = isTrue(value);
    }

}

export = ThrowErrors;
