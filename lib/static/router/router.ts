/// <reference path="../../../types/node/node.d.ts" />

import http        = require("http");
import {IResponse, IClient, Client} from "../client";
import error500    = require("../../routes/error500/router");
import IOptions    = require("./IOptions");
import {IException} from "../exception";
import {isDefined} from "../../utils";

var client:IClient = new Client({});

function router(options:IOptions):((next:() => void) => void) {
    return (next:() => void):void => {

        var request:http.ServerRequest   = options.request,
            response:http.ServerResponse = options.response,
            filename:string              = options.filename,
            socket:string                = options.socket,
            timeout:number               = options.timeout,
            debug:boolean                = options.debug,
            charset:string               = options.server.charset,
            name:string                  = options.server.name,
            version:string               = options.server.version,
            headers:any                  = request.headers || {},
            gzipAllowed:boolean          = String(headers["accept-encoding"]).split(", ").indexOf("gzip") !== -1;

        if (isDefined(socket)) {
            client.setLocation(socket);
        }
        if (isDefined(timeout)) {
            client.setTimeout(timeout);
        }
        if (isDefined(debug)) {
            client.setIsDebug(debug);
        }
        client.getContent(filename, (errors:IException[], result:IResponse):void => {
            var modified:number = Date.parse(request.headers["if-modified-since"]),
                date:number = result && result.date ? 1000 * result.date : 0;
            if (errors && errors.length) {
                error500({
                    request  : request,
                    response : response,
                    server   : {
                        charset : charset,
                        name    : name,
                        version : version
                    }
                })();
            } else if (modified && modified === date) {
                response.writeHead(304);
                response.end();
            } else if (result && result.zipContent && gzipAllowed) {
                response.setHeader("Content-Type", result.type);
                response.setHeader("Last-Modified", new Date(result.date * 1000).toUTCString());
                response.setHeader("Content-Encoding", "gzip");
                response.writeHead(200);
                response.end(result.zipContent);
            } else if (result && result.content) {
                response.setHeader("Content-Type", result.type);
                response.setHeader("Last-Modified", new Date(result.date * 1000).toUTCString());
                response.writeHead(200);
                response.end(result.content);
            } else {
                next();
            }
        });
    };

}

export = router;
