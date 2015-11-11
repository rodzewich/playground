/// <reference path="../../../types/node/node.d.ts" />

import http = require("http");

interface IOptions {
    request:http.ServerRequest;
    response:http.ServerResponse;
    server:{
        name:string;
        charset:string;
        version:string
    };
}

export = IOptions;
