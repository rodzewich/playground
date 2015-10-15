import IInformation = require("../IInformation");
import IBaseClient = require("../../client/IClient");
import IException = require("../exception/IException");

interface IClient extends IBaseClient {
    namespace:string;
    getNamespace():string;
    setNamespace(namespace:string):void;
    ping(callback?:(errors:IException[]) => void):void;
    stop(callback?:(errors:IException[]) => void):void;
    getInfo(callback?:(errors:IException[], response:IInformation) => void):void;
    getNamespaces(callback?:(errors:IException[], response:string[]) => void):void;
    hasNamespace(namespace:string, callback?:(errors:IException[], response:boolean) => void):void;
    removeNamespace(namespace:string, callback?:(errors:IException[]) => void):void;
    getItem(key:string, callback?:(errors:IException[], response:any) => void):void;
    getItems(keys:string[], callback?:(errors:IException[], response:{[index:string]:any;}|any) => void):void;
    setItem(key:string, value:any, ttl:number, callback?:(errors:IException[]) => void):void;
    setItems(data:{[index:string]:any;}|any, ttl:number, callback?:(errors:IException[]) => void):void;
    getTtl(key:string, callback?:(errors:IException[], response:number) => void):void;
    getTtls(keys:string[], callback?:(errors:IException[], response:{[index:string]:number;}|any) => void):void;
    setTtl(key:string, ttl:number, callback?:(errors:IException[]) => void):void;
    setTtls(keys:string[], ttl:number, callback?:(errors:IException[]) => void):void;
    increment(key:string, callback?:(errors:IException[], response:string) => void, ttL?:number):void;
    decrement(key:string, callback?:(errors:IException[], response:string) => void, ttL?:number):void;
    removeItem(key:string, callback?:(errors:IException[]) => void):void;
    removeItems(keys:string[], callback?:(errors:IException[]) => void):void;
    hasItem(key:string, callback?:(errors:IException[], response:boolean) => void):void;
    hasItems(keys:string[], callback?:(errors:IException[], response:{[index:string]:boolean;}|any) => void):void;
    getKey(index:number, callback?:(errors:IException[], response:string) => void):void;
    getKeys(indexes:number[], callback?:(errors:IException[], response:string[]) => void):void;
    getLength(callback?:(errors:IException[], response:number) => void):void;
    lock(key:string, callback?:(errors:IException[], unlock:(callback?:(errors:IException[]) => void) => void) => void):void;
}

export = IClient;
