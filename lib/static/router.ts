/// <reference path="../../types/node/node.d.ts" />

import http = require("http");
import config = require("../../config");
import Client = require("./client/Client");
import IClient = require("./client/IClient");

var client:IClient = new Client({
    location : config.PROJECT_STATIC_SOCKET,
    //timeout  : 123,
    debug    : config.DEBUG
});

function router(options, next:() => void):void {
    var request:http.ServerRequest = options.request,
        response:http.ServerResponse = options.response,
        filename:string = options.filename;


    var headers:any = request.headers || {},
        gzipAllowed:boolean = String(headers["accept-encoding"]).split(", ").indexOf("gzip") !== -1;
    client.getContent(pathname, (errors:IStaticException[], result:IStaticResponse):void => {
        var modified:number = Date.parse(request.headers["if-modified-since"]),
            date:number = result && result.date ? 1000 * result.date : 0;
        if (errors && errors.length) {
            response.setHeader("Content-Type", ContentType.HTML.toString(config.PROJECT_SERVER_CHARSET));
            response.writeHead(500);
            response.end(error500({
                serverName    : config.PROJECT_SERVER_NAME,
                serverVersion : config.PROJECT_SERVER_VERSION
            }, errors));
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
}

export = router;
