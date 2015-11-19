/// <reference path="../../types/node/node.d.ts" />

import http = require("http");
import path = require("path");

export interface IOptions {
    method:string;
    filename:string;
    request:http.ServerRequest;
    response:http.ServerResponse;
    query:string;
}

export function router(options:IOptions):((next:() => void) => void) {
    return (next:() => void):void => {
        var method:string                = options.method,
            filename:string              = options.filename,
            resolved:string              = path.normalize(filename),
            response:http.ServerResponse = options.response,
            query:string                 = options.query;
        if (method === "GET" && filename !== resolved) {
            response.writeHead(301);
            response.setHeader("Location", resolved + (query ? "?" + query : query));
            response.end();
        } else {
            next();
        }
    };
}
