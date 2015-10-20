/// <reference path="../../../types/node/node.d.ts" />

import IInformation     = require("../IInformation");
import IClientBase      = require("../../client/IClient");
import IException       = require("../exception/IException");
import INamespaceHelper = require("../../helpers/INamespaceHelper");

interface IClient extends IClientBase {
    namespace:string;
    getNamespace():string;
    setNamespace(namespace:string):void;
    ping(callback?:(errors:IException[]) => void):void;
    stop(callback?:(errors:IException[]) => void):void;
    getInfo(callback?:(errors:IException[], response:IInformation) => void):void;
    getNamespaces(callback?:(errors:IException[], response:string[]) => void):void;
    hasNamespace(namespace:string, callback?:(errors:IException[], response:boolean) => void):void;
    removeNamespace(namespace:string, callback?:(errors:IException[]) => void):void;
    getItem(key:string, callback?:(errors:IException[], response:any) => void, namespace?:INamespaceHelper):void;
    getItems(keys:string[], callback?:(errors:IException[], response:{[index:string]:any;}|any) => void, namespace?:INamespaceHelper):void;
    getBin(key:string, callback?:(errors:IException[], response:Buffer) => void, namespace?:INamespaceHelper):void;
    getBins(keys:string[], callback?:(errors:IException[], response:{[index:string]:Buffer;}|any) => void, namespace?:INamespaceHelper):void;
    setItem(key:string, value:any, ttl:number, callback?:(errors:IException[]) => void, namespace?:INamespaceHelper):void;
    setItems(data:{[index:string]:any;}|any, ttl:number, callback?:(errors:IException[]) => void, namespace?:INamespaceHelper):void;
    setBin(key:string, value:any, ttl:number, callback?:(errors:IException[]) => void, namespace?:INamespaceHelper):void;
    setBins(data:{[index:string]:any;}|any, ttl:number, callback?:(errors:IException[]) => void, namespace?:INamespaceHelper):void;
    getTtl(key:string, callback?:(errors:IException[], response:number) => void, namespace?:INamespaceHelper):void;
    getTtls(keys:string[], callback?:(errors:IException[], response:{[index:string]:number;}|any) => void, namespace?:INamespaceHelper):void;
    setTtl(key:string, ttl:number, callback?:(errors:IException[]) => void, namespace?:INamespaceHelper):void;
    setTtls(keys:string[], ttl:number, callback?:(errors:IException[]) => void, namespace?:INamespaceHelper):void;
    increment(key:string, ttl:number, callback?:(errors:IException[], response:string) => void, namespace?:INamespaceHelper):void;
    decrement(key:string, ttl:number, callback?:(errors:IException[], response:string) => void, namespace?:INamespaceHelper):void;
    removeItem(key:string, callback?:(errors:IException[]) => void, namespace?:INamespaceHelper):void;
    removeItems(keys:string[], callback?:(errors:IException[]) => void, namespace?:INamespaceHelper):void;
    hasItem(key:string, callback?:(errors:IException[], response:boolean) => void, namespace?:INamespaceHelper):void;
    hasItems(keys:string[], callback?:(errors:IException[], response:{[index:string]:boolean;}|any) => void, namespace?:INamespaceHelper):void;
    getKey(index:number, callback?:(errors:IException[], response:string) => void, namespace?:INamespaceHelper):void;
    getKeys(indexes:number[], callback?:(errors:IException[], response:string[]) => void, namespace?:INamespaceHelper):void;
    getLength(callback?:(errors:IException[], response:number) => void, namespace?:INamespaceHelper):void;
    lock(key:string, callback?:(errors:IException[], unlock:(callback?:(errors:IException[]) => void) => void) => void, namespace?:INamespaceHelper):void;
}

export = IClient;
