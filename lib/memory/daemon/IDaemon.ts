import IBaseDaemon = require("../../daemon/IDaemon");
import IException = require("../exception/IException");

interface IDaemon extends IBaseDaemon {
    ping();
    getNamespaces();
    hasNamespace();
    removeNamespace();
    getItem(namespace:string, key:string):any;
    getItems(namespace:string, keys:string[]):any;
    setItem(namespace:string, key:string, value:any):void;
    setItems(namespace:string, data:any):void;
    removeItem(namespace:string, key:string):void;
    removeItems(namespace:string, keys:string[]):void;
    hasItem(namespace:string, key:string):boolean;
    hasItems(namespace:string, keys:string[]):boolean[];
    getKey(namespace:string, index:number):string;
    getKeys(namespace:string, indexes:number[]):string[];
    getLength(namespace:string):number;
    lock(namespace:string, key:string, callback:(error?:IException) => void):void;
    unlock(namespace:string, key:string):void;
}

export = IDaemon;
