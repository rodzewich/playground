/// <reference path="../client/IClient.ts" />

import IClient = require("../client/IClient");

interface IManager {
    compile(filename:string, callback:(errors?:Error[], result:any) => void):void;
    connect(callback:(errors?:Error[]) => void): void;
    disconnect(callback:(errors?:Error[]) => void): void;
}

export = IManager;
