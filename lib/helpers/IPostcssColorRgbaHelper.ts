/// <reference path="./IPostcssHelper.ts" />

import IPostcssHelper = require("./IPostcssHelper");

interface IPostcssColorRgbaHelper extends IPostcssHelper {
    getProperties():string[];
    setProperties(value:string[]):void;
}

export = IPostcssColorRgbaHelper;
