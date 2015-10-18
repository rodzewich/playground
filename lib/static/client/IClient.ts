import IClientBase  = require("../../client/IClient");

interface IClient extends IClientBase {
    namespace:string;
    getNamespace():string;
    setNamespace(namespace:string):void;

}

export = IClient;
