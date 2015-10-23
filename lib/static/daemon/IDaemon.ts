import IDaemonBase = require("../../daemon/IDaemon");
import IRequest    = require("../IRequest");
import IResponse   = require("../IResponse");

interface IDaemon extends IDaemonBase {
    getContent(filename:string, options:IRequest, callback?:(errors:Exception[], result:IResponse) => void):void;
}

export = IDaemon;
