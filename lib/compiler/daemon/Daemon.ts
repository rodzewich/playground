import BaseDaemon = require("../../daemon/Daemon");
import IOptions = require("./IOptions");
import IDaemon = require("./IDaemon");
import IResponse = require("../client/IResponse");
import IRequest = require("../client/IRequest");
import Compiler = require("../compiler/Compiler");
import typeOf = require("../../typeOf");
import WrapperException = require("../../WrapperException");
import IMemory = require("../../memory/client/IClient");

abstract class Daemon extends BaseDaemon implements IDaemon {

    private _memory:IMemory;

    constructor(options:IOptions) {
        super(options);
        if (options && typeOf(options.memory) !== "undefined") {
            this.setMemory(options.memory);
        }
    }

    protected setMemory(value:IMemory):void {
        this._memory = value;
    }

    protected getMemory():IMemory {
        return this._memory;
    }

    abstract compile(options:IRequest, callback:(errors?:Error[], result?:IResponse) => void):void;

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
                                return WrapperException.convertToObject(error);
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
                    });
                    break;
            }
        });
    }

}

export = Daemon;
