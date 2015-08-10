/// <reference path="../IOptions.ts" />

import IAbstractOptions = require("../IOptions");

interface IOptions extends IAbstractOptions {
    document?: Document;
}

export = IOptions;
