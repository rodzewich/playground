import IBaseDaemon  = require("../../daemon/IDaemon");
import IException   = require("../exception/IException");
import IInformation = require("../IInformation");

interface IDaemon extends IBaseDaemon {
    getNamespaces():string[];
    hasNamespace(namespace:string):boolean;
    removeNamespace(namespace:string):void;
    getInfo():IInformation;
    getItem(namespace:string, key:string):any;
    getItems(namespace:string, keys:string[]):any;
    getBin(namespace:string, key:string):Buffer;
    getBins(namespace:string, keys:string[]):{[index:string]:Buffer}|any;
    setItem(namespace:string, key:string, value:any, ttl:number):void;
    setItems(namespace:string, data:any, ttl:number):void;
    setBin(namespace:string, key:string, value:Buffer, ttl:number):void;
    setBins(namespace:string, data:{[index:string]:Buffer}|any, ttl:number):void;
    removeItem(namespace:string, key:string):void;
    removeItems(namespace:string, keys:string[]):void;
    hasItem(namespace:string, key:string):boolean;
    hasItems(namespace:string, keys:string[]):boolean[];
    getKey(namespace:string, index:number):string;
    getKeys(namespace:string, indexes:number[]):string[];
    getLength(namespace:string):number;
    increment(namespace:string, key:string, ttl:number);
    decrement(namespace:string, key:string, ttl:number);
    lock(namespace:string, key:string, callback?:(errors:IException[]) => void):void;
    unlock(namespace:string, key:string):void;
}

export = IDaemon;
