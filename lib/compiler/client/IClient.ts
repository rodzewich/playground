/// <reference path="../../client/IClient.ts" />
/// <reference path="./IResponse.ts" />

import IAbstractClient = require("../../client/IClient");
import IResponse = require("./IResponse");


interface IClient extends IAbstractClient {
    compile(filename:string, callback?:(errors?:Error[], result?:IResponse) => void): void;
}

export = IClient;
