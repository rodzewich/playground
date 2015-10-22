import isTrue = require("../isTrue");
import IUseGzipHelper = require("./IUseGzipHelper");

class UseGzipHelper implements IUseGzipHelper {

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

export = UseGzipHelper;
