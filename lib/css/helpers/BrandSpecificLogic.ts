import {isTrue} from "../../utils/common";
import IBrandSpecificLogic = require("./IBrandSpecificLogic");

class BrandSpecificLogic implements IBrandSpecificLogic {

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

export = BrandSpecificLogic;
