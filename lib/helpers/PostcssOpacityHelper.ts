/// <reference path="./IPostcssOpacityHelper.ts" />
/// <reference path="./PostcssHelper.ts" />

import PostcssHelper = require("./PostcssHelper");
import IPostcssOpacityHelper = require("./IPostcssOpacityHelper");
import postcssOpacity = require("postcss-opacity");

class PostcssOpacityHelper extends PostcssHelper implements IPostcssOpacityHelper {

    public getInstance():any {
        return postcssOpacity;
    }

}

export = PostcssOpacityHelper;
