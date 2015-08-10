/// <reference path="../IOptions.ts" />

import IAbstractOptions = require("../IOptions");

interface IOptions extends IAbstractOptions {
    port?: number;
    protocol?: string;
    variables?: any;
    hostname?: string;
}

export = IOptions;
