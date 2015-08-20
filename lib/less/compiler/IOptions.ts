/// <reference path="../../compiler/compiler/IOptions.ts" />

import IAbstractOptions = require("../../compiler/compiler/IOptions");

interface IOptions extends IAbstractOptions {
    includeDirectories?: string[];
    errorBackgroundColor?: string;
    errorTextColor?: string;
    errorBlockPadding?: string;
    errorFontSize?: string;
}

export = IOptions;
