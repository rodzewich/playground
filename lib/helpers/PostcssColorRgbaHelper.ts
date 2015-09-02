/// <reference path="./IPostcssColorRgbaHelper.ts" />
/// <reference path="./PostcssHelper.ts" />

import IPostcssColorRgbaHelper = require("./IPostcssColorRgbaHelper");
import PostcssHelper = require("./PostcssHelper");
import postcssColorRgba = require("postcss-color-rgba-fallback");

class PostcssColorRgbaHelper extends PostcssHelper implements IPostcssColorRgbaHelper {

    private _properties:string[] = ["background-color", "background", "color", "border", "border-color", "outline", "outline-color"];

    public getProperties():string[] {
        return this._properties;
    }

    public setProperties(value:string[]):void {
        this._properties = value;
    }

    public getInstance(): any {
        return postcssColorRgba({
            properties: this.getProperties()
        });
    }

}

export = PostcssColorRgbaHelper;
