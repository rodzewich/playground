/// <reference path="../../client/IOptions.ts" />

import IBaseOptions = require("../../client/IOptions");

interface IOptions extends IBaseOptions {
    sourcesDirectory: string;
    memoryLocation: string;
    useCache: boolean;
    errorBackgroundColor?: string;
    errorTextColor?: string;
    errorBlockPadding?: string;
    errorFontSize?: string;
    webRootDirectory: string;
}

export = IOptions;
