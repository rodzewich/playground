/// <reference path="../../client/IClient.ts" />

import IAbstractClient = require("../../client/IClient");

interface IClient extends IAbstractClient {
    getItem(key:string, callback:(error?:Error, response?:any) => void): void;
    getItems(keys:string[], callback:(error?:Error, response?:any) => void): void;
    setItem(key:string, value:any, callback:(error?:Error) => void): void;
    setItems(data:any, callback:(error?:Error) => void): void;
    removeItem(key:string, callback:(error?:Error) => void):void;
    removeItems(keys:string[], callback:(error?:Error) => void):void;
    hasItem(key:string, callback:(error?:Error, response?:boolean) => void):void;
    hasItems(keys:string[], callback:(error?:Error, response?:any) => void):void;
    getKey(index:number, callback:(error?:Error, response?:string) => void): void;
    getKeys(indexes:number[], callback:(error?:Error, response?:string[]) => void): void;
    getLength(callback:(error?:Error, response?:number) => void):void;
    lock(key:string, callback:(error?:Error, unlock?:(callback:(error?:Error) => void) => void) => void):void;
}

export = IClient;
