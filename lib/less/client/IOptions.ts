/// <reference path="../../compiler/client/IOptions.ts" />

import IBaseOptions = require("../../compiler/client/IOptions");

interface IOptions extends IBaseOptions {
    includeDirectories?: string[];
    errorBackgroundColor?: string;
    errorTextColor?: string;
    errorBlockPadding?: string;
    errorFontSize?: string;
}

export = IOptions;
