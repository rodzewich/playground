/// <reference path="../../compiler/client/IRequest.ts" />

import IAbstractRequest = require("../../compiler/client/IRequest");

interface IRequest extends IAbstractRequest {
    includeDirectories?: string[];
    errorBackgroundColor?: string;
    errorTextColor?: string;
    errorBlockPadding?: string;
    errorFontSize?: string;
}

export = IRequest;
