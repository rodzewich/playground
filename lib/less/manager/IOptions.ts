/// <reference path="../../compiler/manager/IOptions.ts" />

import IAbstractOptions = require("../../compiler/manager/IOptions");

interface IOptions extends IAbstractOptions {
    includeDirectories?: string[];
    errorBackgroundColor?: string;
    errorTextColor?: string;
    errorBlockPadding?: string;
    errorFontSize?: string;
}

export = IOptions;
