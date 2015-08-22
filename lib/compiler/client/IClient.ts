/// <reference path="../../client/IClient.ts" />
/// <reference path="./IResponse.ts" />

import IBaseClient = require("../../client/IClient");
import IResponse = require("./IResponse");


interface IClient extends IBaseClient {
    compile(filename:string, callback?:(errors?:Error[], result?:IResponse) => void): void;
}

export = IClient;
