import IException = require("../exception/IException");

interface IClient {
    location:string;
    timeout:number;
    connected:boolean;
    disconnected:boolean;
    connect(callback?:(errors:IException[]) => void): void;
    disconnect(callback?:(errors:IException[]) => void): void;
    isConnected():boolean;
    isDisconnected():boolean;
    getLocation():string;
    setLocation(location:string):void;
    getTimeout():number;
    setTimeout(timeout:number):void;
}

export = IClient;
