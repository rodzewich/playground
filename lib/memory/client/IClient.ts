/// <reference path="../../../types/node/node.d.ts" />

import IInformation = require("../IInformation");
import IClientBase  = require("../../client/IClient");
import IException   = require("../exception/IException");

interface IClient extends IClientBase {
    namespace:string;
    getNamespace():string;
    setNamespace(namespace:string):IClient;
    setLocation(location:string):IClient;
    setTimeout(timeout:number):IClient;
    setIsDebug(value:boolean):IClient;
    ping(callback?:(errors:IException[]) => void):IClient;
    stop(callback?:(errors:IException[]) => void):IClient;
    getInfo(callback?:(errors:IException[], response:IInformation) => void):IClient;
    getNamespaces(callback?:(errors:IException[], response:string[]) => void):IClient;
    hasNamespace(namespace:string, callback?:(errors:IException[], response:boolean) => void):IClient;
    removeNamespace(namespace:string, callback?:(errors:IException[]) => void):IClient;
    getItem(key:string, callback?:(errors:IException[], response:any) => void, namespace?:string):IClient;
    getItems(keys:string[], callback?:(errors:IException[], response:{[index:string]:any;}|any) => void, namespace?:string):IClient;
    getBin(key:string, callback?:(errors:IException[], response:Buffer) => void, namespace?:string):IClient;
    getBins(keys:string[], callback?:(errors:IException[], response:{[index:string]:Buffer;}|any) => void, namespace?:string):IClient;
    setItem(key:string, value:any, ttl:number, callback?:(errors:IException[]) => void, namespace?:string):IClient;
    setItems(data:{[index:string]:any;}|any, ttl:number, callback?:(errors:IException[]) => void, namespace?:string):IClient;
    setBin(key:string, value:any, ttl:number, callback?:(errors:IException[]) => void, namespace?:string):IClient;
    setBins(data:{[index:string]:any;}|any, ttl:number, callback?:(errors:IException[]) => void, namespace?:string):IClient;
    getTtl(key:string, callback?:(errors:IException[], response:number) => void, namespace?:string):IClient;
    getTtls(keys:string[], callback?:(errors:IException[], response:{[index:string]:number;}|any) => void, namespace?:string):IClient;
    setTtl(key:string, ttl:number, callback?:(errors:IException[]) => void, namespace?:string):IClient;
    setTtls(keys:string[], ttl:number, callback?:(errors:IException[]) => void, namespace?:string):IClient;
    increment(key:string, ttl:number, callback?:(errors:IException[], response:string) => void, namespace?:string):IClient;
    decrement(key:string, ttl:number, callback?:(errors:IException[], response:string) => void, namespace?:string):IClient;
    removeItem(key:string, callback?:(errors:IException[]) => void, namespace?:string):IClient;
    removeItems(keys:string[], callback?:(errors:IException[]) => void, namespace?:string):IClient;
    hasItem(key:string, callback?:(errors:IException[], response:boolean) => void, namespace?:string):IClient;
    hasItems(keys:string[], callback?:(errors:IException[], response:{[index:string]:boolean;}|any) => void, namespace?:string):IClient;
    getKey(index:number, callback?:(errors:IException[], response:string) => void, namespace?:string):IClient;
    getKeys(indexes:number[], callback?:(errors:IException[], response:string[]) => void, namespace?:string):IClient;
    getLength(callback?:(errors:IException[], response:number) => void, namespace?:string):IClient;
    lock(key:string, callback?:(errors:IException[], unlock:(callback?:(errors:IException[]) => void) => void) => void, namespace?:string):IClient;
}

export = IClient;
