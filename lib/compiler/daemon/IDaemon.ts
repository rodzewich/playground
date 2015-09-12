import IBaseDaemon = require("../../daemon/IDaemon");
import IResponse = require("../client/IResponse");
import IRequest = require("../client/IRequest");

interface IDaemon extends IBaseDaemon {
    compile(request:IRequest, callback:(errors:Error[], response:IResponse) => void): void;
}

export = IDaemon;
