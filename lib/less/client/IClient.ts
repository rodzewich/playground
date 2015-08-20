/// <reference path="../../compiler/client/IClient.ts" />
/// <reference path="./IResult.ts" />

import IAbstractClient = require("../../compiler/client/IClient");
import IResult = require("./IResult");

interface IClient extends IAbstractClient {
    compile(filename:string, callback?:(errors?:Error[], result?:IResult) => void): void;
}

export = IClient;
