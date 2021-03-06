/// <reference path="../../types/node/node.d.ts" />

import http        = require("http");
import ContentType = require("../helpers/ContentType");
import error500    = require("../../errors/500");

export interface IOptions {
    request:http.ServerRequest;
    response:http.ServerResponse;
    server:{
        name:string;
        charset:string;
        version:string
    };
}

// todo: load custom template

export function router(options:IOptions):(() => void) {
    return ():void => {
        var request:http.ServerRequest   = options.request,
            response:http.ServerResponse = options.response,
            charset:string               = options.server.charset,
            name:string                  = options.server.name,
            version:string               = options.server.version;
        response.setHeader("Content-Type", ContentType.HTML.toString(charset));
        response.writeHead(500);
        response.end(error500({
            name    : name,
            version : version
        }));
    };
}
