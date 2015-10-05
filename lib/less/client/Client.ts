/// <reference path="../../../types/node/node.d.ts" />

import typeOf = require("../../typeOf");
import isDefined = require("../../isDefined");
import IOptions = require("./IOptions");
import IClient = require("./IClient");
import BaseClient = require("../../css/client/Client");
import IResponse = require("./IResponse");
import path = require("path");

class Client extends BaseClient implements IClient {

    constructor(options:IOptions) {
        super(options);
    }

    protected getDaemon():string {
        return path.join(__dirname, "../daemon.js");
    }

    public compile(filename:string, callback?:(errors:Error[], result:IResponse) => void):void {
        super.compile(filename, (errors:Error[], result:any):void => {
            if (typeOf(callback) === "function") {
                callback(errors, <IResponse>result);
            }
        });
    }

}

export = Client;
