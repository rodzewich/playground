/// <reference path="../../client/IOptions.ts" />

import IAbstractOptions = require("../../client/IOptions");

interface IOptions extends IAbstractOptions {
    sourcesDirectory: string;
}

export = IOptions;
