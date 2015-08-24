/// <reference path="../../types/node/node.d.ts" />

import http = require("http");

export interface RouterOptions {
    server: http.Server;
    request: http.ServerRequest;
    response: http.ServerResponse;
}

export interface InitOptions {
}
