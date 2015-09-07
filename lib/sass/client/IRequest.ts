/// <reference path="../../compiler/client/IRequest.ts" />

import IBaseRequest = require("../../compiler/client/IRequest");

interface IRequest extends IBaseRequest {
    includeDirectories: string[];
    sassLocation: string;
    compassLocation: string;
}

export = IRequest;
