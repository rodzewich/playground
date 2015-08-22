/// <reference path="../../compiler/compiler/IOptions.ts" />

import IBaseOptions = require("../../compiler/compiler/IOptions");

interface IOptions extends IBaseOptions {
    includeDirectories?: string[];
    errorBackgroundColor?: string;
    errorTextColor?: string;
    errorBlockPadding?: string;
    errorFontSize?: string;
}

export = IOptions;
