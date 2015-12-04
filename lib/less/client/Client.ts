/// <reference path="../../../types/node/node.d.ts" />

import {isFunction} from "../../utils/common";
import IOptions = require("./IOptions");
import IClient = require("./IClient");
import ClientBase = require("../../css/client/Client");
import IResponse = require("./IResponse");
import path = require("path");

class Client extends ClientBase implements IClient {

    constructor(options:IOptions) {
        super(options);
    }

    protected getDaemon():string {
        return path.join(__dirname, "../daemon.js");
    }

    public compile(filename:string, callback?:(errors:Error[], result:IResponse) => void):void {
        super.compile(filename, (errors:Error[], result:any):void => {
            if (isFunction(callback)) {
                callback(errors, <IResponse>result);
            }
        });
    }

}

export = Client;
