import IResponseBase = require("../../compiler/client/IResponse");

interface IResponse extends IResponseBase {
    source:string;
    result:string;
    deps:string[];
    date:number;
    map:any;
}

export = IResponse;
