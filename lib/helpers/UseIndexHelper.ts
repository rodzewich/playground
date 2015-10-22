import isTrue = require("../isTrue");
import IUseIndexHelper = require("./IUseIndexHelper");

class UseIndexHelper implements IUseIndexHelper {

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

export = UseIndexHelper;
