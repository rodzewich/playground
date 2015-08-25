/// <reference path="../../compiler/daemon/Daemon.ts" />
/// <reference path="./IOptions.ts" />
/// <reference path="./IDaemon.ts" />
/// <reference path="../../compiler/client/IRequest.ts" />
/// <reference path="../../compiler/client/IResponse.ts" />
/// <reference path="../compiler/Compiler.ts" />
/// <reference path="../../typeOf.ts" />

import BaseDaemon = require("../../compiler/daemon/Daemon");
import IOptions = require("./IOptions");
import IDaemon = require("./IDaemon");
import IRequest = require("../client/IRequest");
import IResponse = require("../client/IResponse");
import Compiler = require("../compiler/Compiler");
import typeOf = require("../../typeOf");

class Daemon extends BaseDaemon implements IDaemon {

    constructor(options:IOptions) {
        super(options);
    }

    public compile(options:IRequest, callback:(errors?:Error[], result?:IResponse) => void):void {
        var compiler = new Compiler(options);
        compiler.setMemory(this.getMemory());
        compiler.compile((errors?:Error[], result?:any):void => {
            var temp:Error[],
                data:IResponse;
            if (errors && errors.length) {
                temp = errors;
            } else {
                data = <IResponse>result || null;
            }
            if (typeOf(callback) === "function") {
                callback(temp, data);
            }
        });
    }


}

export = Daemon;
