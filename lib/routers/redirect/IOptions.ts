/// <reference path="../../../types/node/node.d.ts" />

import http = require("http");

interface IOptions {
    method:string;
    filename:string;
    request:http.ServerRequest;
    response:http.ServerResponse;
    query:string;
}

export = IOptions;
