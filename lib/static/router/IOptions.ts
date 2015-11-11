/// <reference path="../../../types/node/node.d.ts" />

import http = require("http");

interface IOptions {
    request:http.ServerRequest;
    response:http.ServerResponse;
    filename:string;
}

export = IOptions;
