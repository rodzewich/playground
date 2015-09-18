/// <reference path="../../../types/node/node.d.ts" />

import typeOf = require("../../typeOf");
import isDefined = require("../../isDefined");
import IOptions = require("./IOptions");
import IClient = require("./IClient");
import BaseClient = require("../../cssPreProcessorAbstract/client/Client");
import IResponse = require("./IResponse");
import path = require("path");

// todo использовать http://lesscss.org/usage/#plugins-list-of-less-plugins
// todo использовать https://github.com/less/less-plugin-clean-css
// todo использовать https://github.com/less/less-plugin-inline-urls
// todo использовать https://github.com/less/less-plugin-npm-import
// todo использовать https://www.npmjs.com/browse/keyword/less%20plugins

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