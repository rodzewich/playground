import IException = require("../exception/IException");

interface IClient {
    location:string;
    connect(callback?:(errors:IException[]) => void): void;
    disconnect(callback?:(errors:IException[]) => void): void;
    getLocation():string;
    setLocation(value:string):void;
}

export = IClient;
