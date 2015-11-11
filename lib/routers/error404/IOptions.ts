/// <reference path="../../../types/node/node.d.ts" />

import http = require("http");

interface IOptions {
    request:http.ServerRequest;
    response:http.ServerResponse;
    charset:string;
    serverName:string;
    serverVersion:string;
}

export = IOptions;
