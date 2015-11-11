/// <reference path="../../../types/node/node.d.ts" />

import http = require("http");
import IOptions = require("./IOptions");
import ContentType = require("../../helpers/ContentType");
import error404 = require("../../../errors/404");

// todo: load custom template

function router(options:IOptions):(() => void) {
    return ():void => {
        var request:http.ServerRequest   = options.request,
            response:http.ServerResponse = options.response,
            charset:string               = options.charset,
            serverName:string            = options.serverName,
            serverVersion:string         = options.serverVersion;
        response.setHeader("Content-Type", ContentType.HTML.toString(charset));
        response.writeHead(404);
        response.end(error404({
            serverName    : serverName,
            serverVersion : serverVersion
        }));
    };
}

export = router;