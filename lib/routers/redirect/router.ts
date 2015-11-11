/// <reference path="../../../types/node/node.d.ts" />

import path     = require("path");
import http     = require("http");
import IOptions = require("./IOptions");

function router(options:IOptions):((next:() => void) => void) {
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

export = router;
