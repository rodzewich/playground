/// <reference path="./IPostcssOpacityHelper.ts" />
/// <reference path="./PostcssHelper.ts" />

import PostcssHelper = require("./PostcssHelper");
import postcssOpacity = require("postcss-opacity");

class PostcssOpacityHelper extends PostcssHelper {

    public getInstance():any {
        return postcssOpacity;
    }

}

export = PostcssOpacityHelper;
