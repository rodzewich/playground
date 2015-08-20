/// <reference path="./IOptions.ts" />
/// <reference path="./IClient.ts" />
/// <reference path="../../compiler/client/Client.ts" />
/// <reference path="../../../types/node/node.d.ts" />
/// <reference path="./IResult.ts" />
/// <reference path="../../typeOf.ts" />

import typeOf = require("../../typeOf");
import IOptions = require("./IOptions");
import IClient = require("./IClient");
import AbstractClient = require("../../compiler/client/Client");
import IResult = require("./IResult");
import path = require("path");

class Client extends AbstractClient {

    protected getDaemon(): string {
        return path.join(__dirname, "../daemon.js");
    }

    public compile(filename:string, callback?:(errors?:Error[], result?:IResult) => void):void {
        super.compile(filename, (errors?:Error[], result?:any):void => {
            if (typeOf(callback) === "function") {
                callback(errors, <IResult>result);
            }
        });
    }

}

export = Client;
