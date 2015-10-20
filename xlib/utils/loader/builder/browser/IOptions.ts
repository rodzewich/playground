/// <reference path="../IOptions.ts" />

import IOptionsBase = require("../IOptions");

interface IOptions extends IOptionsBase {
    port?: number;
    protocol?: string;
    variables?: any;
    hostname?: string;
}

export = IOptions;
