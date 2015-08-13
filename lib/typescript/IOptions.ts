/// <reference path="../compiler/IOptions.ts" />

import IAbstractOptions = require("../compiler/IOptions");

interface IOptions extends IAbstractOptions {
    sourcesDirectory: string;
    scriptsTarget?: string;
    errorBackgroundColor?: string;
    errorTextColor?: string;
    errorBlockPadding?: string;
    errorFontSize?: string;
}
