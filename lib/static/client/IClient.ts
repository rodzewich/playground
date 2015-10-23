import IClientBase = require("../../client/IClient");
import IResponse   = require("../IResponse");
import IException  = require("../exception/IException");

interface IClient extends IClientBase {
    ping(callback?:(errors:IException[]) => void):void;
    stop(callback?:(errors:IException[]) => void):void;
    getContent(filename:string, callback?:(errors:IException[], response:IResponse) => void):void;
}

export = IClient;
