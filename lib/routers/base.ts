/// <reference path="../../types/node/node.d.ts" />

import http = require("http");

export interface Memory {
    [key: string]: Buffer;
}

export interface RouterOptions {
    request: http.ServerRequest;
    response: http.ServerResponse;
}

export interface InitOptions {
}
