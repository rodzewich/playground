/// <reference path="../../daemon/IDaemon.ts" />
/// <reference path="../client/IResponse.ts" />
/// <reference path="../client/IRequest.ts" />

import IAbstractDaemon = require("../../daemon/IDaemon");
import IResponse = require("../client/IResponse");
import IRequest = require("../client/IRequest");

interface IDaemon extends IAbstractDaemon {
    compile(request: IRequest, callback: (errors?: Error[], response?: IResponse) => void): void;
}

export = IDaemon;
