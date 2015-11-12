import {isNumber, isDefined} from "../../utils";
import Exception = require("../../exception/Exception");
import IGzipMinLengthHelper = require("./IGzipMinLengthHelper");

class GzipMinLengthHelper implements IGzipMinLengthHelper {

    private _length:number = 20;

    constructor(length?:number) {
        if (isDefined(length)) {
            this._length = length;
        }
    }

    public getLength():number {
        return this._length;
    }

    public setLength(length:number):void {
        if (!isNumber(length) || length < 0) {
            throw new Exception({message: "length should be a positive integer number"});
        }
        this._length = Math.max(0, parseInt(String(length).split(".")[0], 10) || 0);
    }

}

export = GzipMinLengthHelper;
