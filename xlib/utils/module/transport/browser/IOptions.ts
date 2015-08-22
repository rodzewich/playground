/// <reference path="../IOptions.ts" />

import IBaseOptions = require("../IOptions");

interface IOptions extends IBaseOptions {
    document?: Document;
}

export = IOptions;
