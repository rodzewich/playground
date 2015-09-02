/// <reference path="./IPostcssHelper.ts" />

import IPostcssHelper = require("./IPostcssHelper");

interface IPostcssEpubHelper extends IPostcssHelper {
    isFonts():boolean;
    getFonts():boolean;
    setFonts(value:boolean):void;
    isStrip():boolean;
    getStrip():boolean;
    setStrip(value:boolean):void;
    isStrict():boolean;
    getStrict():boolean;
    setStrict(value:boolean):void;
}

export = IPostcssEpubHelper;
