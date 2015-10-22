import IException = require("../exception/IException");

interface IDeferred {
    ping(callback?:(errors:IException[], next:() => void) => void):void;
    stop(callback?:(errors:IException[], next:() => void) => void):void;
    getInfo(callback?:(errors:IException[], next:() => void, response:IInformation) => void):void;
    getNamespaces(callback?:(errors:IException[], next:() => void, response:string[]) => void):void;
    hasNamespace(namespace:string, callback?:(errors:IException[], next:() => void, response:boolean) => void):void;
    removeNamespace(namespace:string, callback?:(errors:IException[], next:() => void) => void):void;
    getItem(key:string, callback?:(errors:IException[], next:() => void, response:any) => void, namespace?:string):void;
    getItems(keys:string[], callback?:(errors:IException[], next:() => void, response:{[index:string]:any;}|any) => void, namespace?:string):void;
    getBin(key:string, callback?:(errors:IException[], next:() => void, response:Buffer) => void, namespace?:string):void;
    getBins(keys:string[], callback?:(errors:IException[], next:() => void, response:{[index:string]:Buffer;}|any) => void, namespace?:string):void;
    setItem(key:string, value:any, ttl:number, callback?:(errors:IException[], next:() => void) => void, namespace?:string):void;
    setItems(data:{[index:string]:any;}|any, ttl:number, callback?:(errors:IException[], next:() => void) => void, namespace?:string):void;
    setBin(key:string, value:any, ttl:number, callback?:(errors:IException[], next:() => void) => void, namespace?:string):void;
    setBins(data:{[index:string]:any;}|any, ttl:number, callback?:(errors:IException[], next:() => void) => void, namespace?:string):void;
    getTtl(key:string, callback?:(errors:IException[], next:() => void, response:number) => void, namespace?:string):void;
    getTtls(keys:string[], callback?:(errors:IException[], next:() => void, response:{[index:string]:number;}|any) => void, namespace?:string):void;
    setTtl(key:string, ttl:number, callback?:(errors:IException[], next:() => void) => void, namespace?:string):void;
    setTtls(keys:string[], ttl:number, callback?:(errors:IException[], next:() => void) => void, namespace?:string):void;
    increment(key:string, ttl:number, callback?:(errors:IException[], next:() => void, response:string) => void, namespace?:string):void;
    decrement(key:string, ttl:number, callback?:(errors:IException[], next:() => void, response:string) => void, namespace?:string):void;
    removeItem(key:string, callback?:(errors:IException[], next:() => void) => void, namespace?:string):void;
    removeItems(keys:string[], callback?:(errors:IException[], next:() => void) => void, namespace?:string):void;
    hasItem(key:string, callback?:(errors:IException[], next:() => void, response:boolean) => void, namespace?:string):void;
    hasItems(keys:string[], callback?:(errors:IException[], next:() => void, response:{[index:string]:boolean;}|any) => void, namespace?:string):void;
    getKey(index:number, callback?:(errors:IException[], next:() => void, response:string) => void, namespace?:string):void;
    getKeys(indexes:number[], callback?:(errors:IException[], next:() => void, response:string[]) => void, namespace?:string):void;
    getLength(callback?:(errors:IException[], next:() => void, response:number) => void, namespace?:string):void;
    lock(key:string, callback?:(errors:IException[], next:() => void, unlock:(callback?:(errors:IException[], next:() => void) => void) => void) => void, namespace?:string):void;
    complete(callback?:() => void):void;
}

export = IDeferred;
