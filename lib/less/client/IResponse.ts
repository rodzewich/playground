/// <reference path="../../compiler/client/IResponse.ts" />

import IAbstractResponse = require("../../compiler/client/IResponse");

interface IResponse extends IAbstractResponse {
    source: string;
    result: string;
    imports: string;
    map: string;
}

export = IResponse;
