import ICharsetHelper = require("./ICharsetHelper");
import {isDefined} from "../utils/common";

class CharsetHelper implements ICharsetHelper {

    private _charset:string = "utf-8";

    constructor(charset?:string) {
        if (isDefined(charset)) {
            this.setCharset(charset);
        }
    }

    public getCharset():string {
        return this._charset;
    }

    public setCharset(charset:string):void {
        this._charset = String(charset);
    }

}

export = CharsetHelper;
