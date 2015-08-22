/// <reference path="../../compiler/client/IRequest.ts" />

import IBaseRequest = require("../../compiler/client/IRequest");

interface IRequest extends IBaseRequest {
    includeDirectories: string[];
    errorBackgroundColor: string;
    errorTextColor: string;
    errorBlockPadding: string;
    errorFontSize: string;
}

export = IRequest;
