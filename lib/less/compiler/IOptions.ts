/// <reference path="../../compiler/compiler/IOptions.ts" />

import IBaseOptions = require("../../compiler/compiler/IOptions");

interface IOptions extends IBaseOptions {
    includeDirectories?: string[];
}

export = IOptions;
