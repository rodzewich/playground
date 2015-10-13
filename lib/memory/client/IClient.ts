import IInformation = require("../IInformation");
import IBaseClient = require("../../client/IClient");
import IException = require("../exception/IException");

interface IClient extends IBaseClient {
    namespace:string;
    getNamespace():string;
    setNamespace(value:string):void;
    ping(callback?:(errors:IException[]) => void):void;
    getInfo(callback?:(errors:IException[], response:IInformation) => void):void;
    getNamespaces(callback?:(errors:IException[], response:string[]) => void):void;
    hasNamespace(value:string, callback?:(errors:IException[], response:boolean) => void):void;
    removeNamespace(value:string, callback?:(errors:IException[]) => void):void;
    getItem(key:string, callback?:(errors:IException[], response:any) => void): void;
    getItems(keys:string[], callback?:(errors:IException[], response:any) => void): void;
    setItem(key:string, value:any, callback?:(errors:IException[]) => void): void;
    setItems(data:any, callback?:(errors:IException[]) => void): void;
    removeItem(key:string, callback?:(errors:IException[]) => void):void;
    removeItems(keys:string[], callback?:(errors:IException[]) => void):void;
    hasItem(key:string, callback?:(errors:IException[], response:boolean) => void):void;
    hasItems(keys:string[], callback?:(errors:IException[], response:any) => void):void;
    getKey(index:number, callback?:(errors:IException[], response:string) => void): void;
    getKeys(indexes:number[], callback?:(errors:IException[], response:string[]) => void): void;
    getLength(callback?:(errors:IException[], response:number) => void):void;
    lock(key:string, callback?:(errors:IException[], unlock:(callback?:(errors:IException[]) => void) => void) => void):void;
}

export = IClient;
