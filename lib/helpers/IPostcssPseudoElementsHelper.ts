///  <reference path="./IPostcssHelper.ts" />

import IPostcssHelper = require("./IPostcssHelper");

interface IPostcssPseudoElementsHelper extends IPostcssHelper {
    getSelectors(): string[];
    setSelectors(value:string[]): void;
}

export = IPostcssPseudoElementsHelper;
