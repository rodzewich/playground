/// <reference path="../../client/Client.ts" />
/// <reference path="./IClient.ts" />
/// <reference path="./IOptions.ts" />

import AbstractClient = require("../../client/Client");
import IOptions = require("./IOptions");
import IClient = require("./IClient");

class Client extends AbstractClient implements IClient {

    constructor(options:IOptions) {
        super(options);
    }

    compile(callback:(errors?:Error[], result:any) => void):void {
        setTimeout(():void => {
            if (typeof callback === "function") {
                callback(null, null);
            }
        }, 0);
    }

}

export = Client;

