import IException = require("../exception/IException");

interface IClient {
    location:string;
    timeout:number;
    connect(callback?:(errors:IException[]) => void): void;
    disconnect(callback?:(errors:IException[]) => void): void;
    getLocation():string;
    setLocation(location:string):void;
    getTimeout():number;
    setTimeout(timeout:number):void;
}

export = IClient;
