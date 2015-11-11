/// <reference path="../../../types/node/node.d.ts" />

import http = require("http");

interface IOptions {
    request:http.ServerRequest;
    response:http.ServerResponse;
    filename:string;
    socket:string;
    timeout:number;
    debug:boolean;
    server:{
        name:string;
        charset:string;
        version:string
    };
}

export = IOptions;
