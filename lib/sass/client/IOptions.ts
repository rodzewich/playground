/// <reference path="../../compiler/client/IOptions.ts" />

import IBaseOptions = require("../../compiler/client/IOptions");

interface IOptions extends IBaseOptions {
    includeDirectories?: string[];
    sassLocation?: string;
    compilerType?: string;
    temporaryDirectory?: string;
}

export = IOptions;
