/// <reference path="../IOptions.ts" />

import IBaseOptions = require("../IOptions");

interface IOptions extends IBaseOptions {
    port?: number;
    protocol?: string;
    variables?: any;
    hostname?: string;
}

export = IOptions;
