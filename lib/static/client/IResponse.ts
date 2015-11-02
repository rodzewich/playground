/// <reference path="../../../types/node/node.d.ts" />

interface IResponse {
    filename:string;
    content:Buffer;
    type:string;
    length:number;
    zipContent:Buffer;
    zipLength:number;
    date:number;
}

export = IResponse;
