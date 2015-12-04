import {isTrue, isDefined} from "../utils/common";
import IUseAbstractHelper = require("./IUseAbstractHelper");

class UseAbstractHelper implements IUseAbstractHelper {

    private _use:boolean = false;

    constructor(value?:boolean) {
        if (isDefined(value)) {
            this.setIsUsed(value);
        }
    }

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

export = UseAbstractHelper;
