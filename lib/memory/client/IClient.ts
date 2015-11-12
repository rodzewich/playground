/// <reference path="../../../types/node/node.d.ts" />

import IInformation = require("./IInformation");
import IClientBase  = require("../../client/IClient");
import {IException} from "../exception";

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
    getItem(key:string, callback?:(errors:IException[], response:any) => void, namespace?:string):void;
    getItems(keys:string[], callback?:(errors:IException[], response:{[index:string]:any;}|any) => void, namespace?:string):void;
    getBin(key:string, callback?:(errors:IException[], response:Buffer) => void, namespace?:string):void;
    getBins(keys:string[], callback?:(errors:IException[], response:{[index:string]:Buffer;}|any) => void, namespace?:string):void;
    setItem(key:string, value:any, ttl:number, callback?:(errors:IException[]) => void, namespace?:string):void;
    setItems(data:{[index:string]:any;}|any, ttl:number, callback?:(errors:IException[]) => void, namespace?:string):void;
    setBin(key:string, value:any, ttl:number, callback?:(errors:IException[]) => void, namespace?:string):void;
    setBins(data:{[index:string]:any;}|any, ttl:number, callback?:(errors:IException[]) => void, namespace?:string):void;
    getTtl(key:string, callback?:(errors:IException[], response:number) => void, namespace?:string):void;
    getTtls(keys:string[], callback?:(errors:IException[], response:{[index:string]:number;}|any) => void, namespace?:string):void;
    setTtl(key:string, ttl:number, callback?:(errors:IException[]) => void, namespace?:string):void;
    setTtls(keys:string[], ttl:number, callback?:(errors:IException[]) => void, namespace?:string):void;
    increment(key:string, ttl:number, callback?:(errors:IException[], response:string) => void, namespace?:string):void;
    decrement(key:string, ttl:number, callback?:(errors:IException[], response:string) => void, namespace?:string):void;
    removeItem(key:string, callback?:(errors:IException[]) => void, namespace?:string):void;
    removeItems(keys:string[], callback?:(errors:IException[]) => void, namespace?:string):void;
    hasItem(key:string, callback?:(errors:IException[], response:boolean) => void, namespace?:string):void;
    hasItems(keys:string[], callback?:(errors:IException[], response:{[index:string]:boolean;}|any) => void, namespace?:string):void;
    getKey(index:number, callback?:(errors:IException[], response:string) => void, namespace?:string):void;
    getKeys(indexes:number[], callback?:(errors:IException[], response:string[]) => void, namespace?:string):void;
    getLength(callback?:(errors:IException[], response:number) => void, namespace?:string):void;
    lock(key:string, callback?:(errors:IException[], unlock:(callback?:(errors:IException[]) => void) => void) => void, namespace?:string):void;
}

export = IClient;
