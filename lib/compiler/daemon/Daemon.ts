import DaemonBase = require("../../daemon/Daemon");
import IOptions = require("./IOptions");
import IDaemon = require("./IDaemon");
import IResponse = require("../client/IResponse");
import IRequest = require("../client/IRequest");
import Compiler = require("../compiler/Compiler");
import {isDefined} from "../../utils";
import Exception = require("../../exception/Exception");
import IMemory = require("../../memory/client/IClient");

abstract class Daemon extends DaemonBase implements IDaemon {

    constructor(options:IOptions) {
        super(options);
    }

    abstract compile(options:IRequest, callback:(errors:Error[], result:IResponse) => void):void;

    protected handler(request:any, callback:(response:any) => void):void {
        super.handler(request, (response:any) => {
            var args:any[] = request.args || [],
                command:string = <string>args.shift();
            switch (command) {
                case "compile":
                    response.result = null;
                    this.compile(<IRequest>args[0], (errors:Error[], result:IResponse):void => {
                        if (errors && errors.length) {
                            response.errors = errors.map((error:Error):any => {
                                return new Exception({
                                    name: error.name,
                                    message: error.message,
                                    stack: error.stack,
                                    code: error.code
                                }).toObject();
                            });
                        } else {
                            response.result = result || null;
                        }
                        callback(response);
                    });
                    break;
                default:
                    // todo: use WrapperException
                    response.errors = [{
                        message: "Command not found"
                    }];
                    setTimeout(():void => {
                        callback(response);
                    }).ref();
                    break;
            }
        });
    }

}

export = Daemon;
