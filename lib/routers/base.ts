/// <reference path="../../types/node/node.d.ts" />

import http = require("http");

export interface RouterOptions {
    request: http.ServerRequest;
    response: http.ServerResponse;
}

export interface InitOptions {
}
