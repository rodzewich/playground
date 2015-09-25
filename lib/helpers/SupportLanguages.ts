import isTrue = require("../isTrue");
import ISupportLanguages = require("./ISupportLanguages");

class SupportLanguages implements ISupportLanguages {

    private _support:boolean = false;

    public isSupport():boolean {
        return this.getIsSupport();
    }

    public getIsSupport():boolean {
        return this._support;
    }

    public setIsSupport(value:boolean):void {
        this._support = isTrue(value);
    }

}

export = SupportLanguages;
