import IBaseResponse = require("../../compiler/client/IResponse");

interface IResponse extends IBaseResponse {
    source:string;
    result:string;
    deps:string[];
    date:number;
    map:any;
}

export = IResponse;
