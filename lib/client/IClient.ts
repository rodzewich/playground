import IException = require("../exception/IException");

interface IClient {
    location:string;
    timeout:number;
    connected:boolean;
    connecting:boolean;
    disconnected:boolean;
    disconnecting:boolean;
    debug:boolean;
    connect(callback?:(errors:IException[]) => void): void;
    disconnect(callback?:(errors:IException[]) => void): void;
    isConnected():boolean;
    isDisconnected():boolean;
    isConnecting():boolean;
    isDisconnecting():boolean;
    getLocation():string;
    setLocation(location:string):IClient;
    getTimeout():number;
    setTimeout(timeout:number):IClient;
    isDebug():boolean;
    getIsDebug():boolean;
    setIsDebug(value:boolean):IClient;
}

export = IClient;
