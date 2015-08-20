/// <reference path="./IOptions.ts" />
/// <reference path="./IClient.ts" />
/// <reference path="../../compiler/client/Client.ts" />
/// <reference path="../../../types/node/node.d.ts" />


import IOptions = require("./IOptions");
import IClient = require("./IClient");
import AbstractClient = require("../../compiler/client/Client");
import path = require("path");

class Client extends AbstractClient {

    protected getDaemon(): string {
        return path.join(__dirname, "../daemon.js");
    }

    public compile(filename:string, callback:(errors?:Error[], result?:any) => void):void {
        // todo: check filename
        this.call((errors?:Error[], response?:any): void => {

        }, "compile", filename);
    }

}

export = Client;
