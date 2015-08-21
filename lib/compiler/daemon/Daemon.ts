/// <reference path="../../daemon/Daemon.ts" />
/// <reference path="./IOptions.ts" />
/// <reference path="./IDaemon.ts" />
/// <reference path="../client/IResponse.ts" />
/// <reference path="../client/IRequest.ts" />

import BaseDaemon = require("../../daemon/Daemon");
import IOptions = require("./IOptions");
import IDaemon = require("./IDaemon");
import IResponse = require("../client/IResponse");
import IRequest = require("../client/IRequest");
import Compiler = require("../compiler/Compiler");
import typeOf = require("../../typeOf");
import CommonError = require("../../CommonError");

class Daemon extends BaseDaemon implements IDaemon {

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

    protected handler(request:any, callback:(response:any) => void):void {
        super.handler(request, (response:any) => {
            var args:any[] = request.args || [],
                command:string = <string>args.shift();
            switch (command) {
                case "compile":
                    response.result = null;
                    this.compile(<IRequest>args[0], (errors?:Error[], result?:IResponse):void => {
                        if (errors && errors.length) {
                            response.errors = errors.map((error:Error):any => {
                                return CommonError.convertToObject(error);
                            });
                        } else {
                            response.result = result || null;
                        }
                        callback(response);
                    });
                    break;
                default:
                    // todo: use CommonError
                    response.errors = [{
                        message: "Command not found"
                    }];
                    setTimeout(():void => {
                        callback(response);
                    });
                    break;
            }
        });
    }

}

export = Daemon;
