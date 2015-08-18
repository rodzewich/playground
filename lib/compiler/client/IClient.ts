/// <reference path="../../client/IClient.ts" />

import IAbstractClient = require("../../client/IClient");

interface IClient extends IAbstractClient {
    compile(callback:(errors?:Error[], result:any) => void): void;
}

export = IClient;
