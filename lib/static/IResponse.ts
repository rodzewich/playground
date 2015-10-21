/// <reference path="../../types/node/node.d.ts" />

interface IResponse {
    filename:string;
    content:Buffer;
    length:number;
    zipContent:Buffer;
    zipLength:number;
    mtime:number;
}

export = IResponse;
