/// <reference path="../compiler/IOptions.ts" />

import IBaseOptions = require("../compiler/IOptions");

interface IOptions extends IBaseOptions {
    sourcesDirectory: string;
    scriptsTarget?: string;
    errorBackgroundColor?: string;
    errorTextColor?: string;
    errorBlockPadding?: string;
    errorFontSize?: string;
}
