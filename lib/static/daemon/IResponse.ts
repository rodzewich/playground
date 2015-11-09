/// <reference path="../../../types/node/node.d.ts" />

interface IResponse {
    filename:string;
    original:string;
    content:string;
    type:string;
    length:number;
    zipContent:string;
    zipLength:number;
    date:number;
}

export = IResponse;
