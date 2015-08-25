/// <reference path="../../compiler/client/IResponse.ts" />

import IBaseResponse = require("../../compiler/client/IResponse");

interface IResponse extends IBaseResponse {
    source: string;
    result: string;
    imports: string[];
    map: any;
    date: number;
}

export = IResponse;
