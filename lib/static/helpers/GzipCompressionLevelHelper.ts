import Exception = require("../exception/Exception");
import IGzipCompressionLevel = require("./IGzipCompressionLevelHelper");

class GzipCompressionLevelHelper implements IGzipCompressionLevelHelper {

    private _level:number = 1;

    public getLevel():number {
        return this._level;
    }

    public setLevel(level:number):void {
        if ([1, 2, 3, 4, 5, 6, 7, 8, 9].indexOf(level) === -1) {
            throw new Exception({message: "level should be a integer number between 1 to 9"});
        }
        this._level = level;
    }

}

export = GzipCompressionLevelHelper;
