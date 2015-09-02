/// <reference path="./IPostcssHelper.ts" />

import IPostcssHelper = require("./IPostcssHelper");

interface IPostcssAutoprefixerHelper extends IPostcssHelper {
    getBrowsers():string[];
    setBrowsers(value:string[]):void;
    isCascade():boolean;
    getCascade():boolean;
    setCascade(value:boolean):void;
    isAdd():boolean;
    getAdd():boolean;
    setAdd(value:boolean):void;
    isRemove():boolean;
    getRemove():boolean;
    setRemove(value:boolean):void;
}

export = IPostcssAutoprefixerHelper;
