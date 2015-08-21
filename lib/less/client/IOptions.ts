/// <reference path="../../compiler/client/IOptions.ts" />

import IAbstractOptions = require("../../compiler/client/IOptions");

interface IOptions extends IAbstractOptions {
    includeDirectories?: string[];
    errorBackgroundColor?: string;
    errorTextColor?: string;
    errorBlockPadding?: string;
    errorFontSize?: string;
}

export = IOptions;
