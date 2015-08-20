/// <reference path="../../compiler/daemon/Daemon.ts" />
/// <reference path="./IOptions.ts" />
/// <reference path="./IDaemon.ts" />

import AbstractDaemon = require("../../compiler/daemon/Daemon");
import IOptions = require("./IOptions");
import IDaemon = require("./IDaemon");

class Daemon extends AbstractDaemon implements IDaemon {

    constructor(options:IOptions) {
        super(options);
    }

    public compile(options:IRequest, callback:(errors?:Error[], result?:IResponse) => void):void {
        var compiler = new Compiler(options);
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
