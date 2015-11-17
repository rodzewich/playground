import IClientBase = require("../../client/IClient");
import IResponse   = require("./IResponse");
import {IException} from "../exception";

interface IClient extends IClientBase {
    ping(callback?:(errors:IException[]) => void):void;
    stop(callback?:(errors:IException[]) => void):void;
    getContent(filename:string, callback?:(errors:IException[], response:IResponse) => void):void;
    isCacheOnly():boolean;
    getIsCacheOnly():boolean;
    setIsCacheOnly(value:boolean):void;
}

export = IClient;
