/// <reference path="../../client/IClient.ts" />

import IAbstractClient = require("../../client/IClient");

interface IClient extends IAbstractClient {
    getItem(key:string, callback:(errors?:Error[], response?:any) => void): void;
    getItems(keys:string[], callback:(errors?:Error[], response?:any) => void): void;
    setItem(key:string, value:any, callback:(errors?:Error[]) => void): void;
    setItems(data:any, callback:(errors?:Error[]) => void): void;
    removeItem(key:string, callback:(errors?:Error[]) => void):void;
    removeItems(keys:string[], callback:(errors?:Error[]) => void):void;
    hasItem(key:string, callback:(errors?:Error[], response?:boolean) => void):void;
    hasItems(keys:string[], callback:(errors?:Error[], response?:any) => void):void;
    getKey(index:number, callback:(errors?:Error[], response?:string) => void): void;
    getKeys(indexes:number[], callback:(errors?:Error[], response?:string[]) => void): void;
    getLength(callback:(errors?:Error[], response?:number) => void):void;
    lock(key:string, callback:(errors?:Error[], unlock?:(callback:(errors?:Error[]) => void) => void) => void):void;
}

export = IClient;
