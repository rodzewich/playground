/// <reference path="../../client/IOptions.ts" />

import IAbstractOptions = require("../../client/IOptions");

interface IOptions extends IAbstractOptions {
    namespace?: string;
}

export = IOptions;
