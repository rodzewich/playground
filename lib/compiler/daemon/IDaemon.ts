import IDaemonBase = require("../../daemon/IDaemon");
import IResponse = require("../client/IResponse");
import IRequest = require("../client/IRequest");

interface IDaemon extends IDaemonBase {
    compile(request:IRequest, callback:(errors:Error[], response:IResponse) => void): void;
}

export = IDaemon;
