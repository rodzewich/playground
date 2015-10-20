import IClientBase = require("../../css/client/IClient");
import IResponse = require("./IResponse");

interface IClient extends IClientBase {
    compile(filename:string, callback?:(errors:Error[], result:IResponse) => void): void;
}

export = IClient;
