/// <reference path="../../compiler/manager/IOptions.ts" />

import IBaseOptions = require("../../compiler/manager/IOptions");

interface IOptions extends IBaseOptions {
    includeDirectories?: string[];
    errorBackgroundColor?: string;
    errorTextColor?: string;
    errorBlockPadding?: string;
    errorFontSize?: string;
}

export = IOptions;
