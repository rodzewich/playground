import {isNull} from "../../utils";
import {Exception} from "../exception";
import IGzipCompressionLevelHelper = require("./IGzipCompressionLevelHelper");

class GzipCompressionLevelHelper implements IGzipCompressionLevelHelper {

    private _default:number = 1;

    private _level:number = this._default;

    public getLevel():number {
        return this._level;
    }

    public setLevel(level:number):void {
        if (isNull(level)) {
            this._level = this._default;
        } else if ([1, 2, 3, 4, 5, 6, 7, 8, 9].indexOf(level) === -1) {
            throw new Exception({message: "level should be a integer number between 1 to 9"});
        } else {
            this._level = level;
        }
    }

}

export = GzipCompressionLevelHelper;
