/// <reference path="./IPostcssVminHelper.ts" />
/// <reference path="./PostcssHelper.ts" />

import PostcssHelper = require("./PostcssHelper");
import IPostcssVminHelper = require("./IPostcssVminHelper");
import postcssVmin = require("postcss-vmin");

class PostcssOpacityHelper extends PostcssHelper implements IPostcssVminHelper {

    public getInstance():any {
        return postcssVmin;
    }

}

export = PostcssOpacityHelper;
