import DaemonBase = require("../../daemon/Daemon");
import IDaemon    = require("./IDaemon");
import IOptions   = require("./IOptions");
import IRequest   = require("../IRequest");
import IResponse  = require("../IResponse");
import log4js     = require("../../../logger");
import Exception  = require("../exception/Exception");
import IException = require("../exception/IException");
import IObject    = require("../exception/IObject");
import isFunction = require("../../isFunction");
import ExceptionBase = require("../../exception/Exception");

var logger:log4js.Logger = log4js.getLogger("static");

class Daemon extends DaemonBase implements IDaemon {

    constructor(options:IOptions) {
        super(options);
    }

    public getContent(filename:string, options:IRequest, callback?:(errors:Exception[], result:IResponse) => void):void {

        function handler(errors:Exception[], result:IResponse):void {
            if (isFunction(callback)) {
                callback(errors, result);
            }
        }



    }

    protected handler(request:any, callback:(response:any) => void):void {

        function handler(response:any):void {
            if (isFunction(callback)) {
                setTimeout((): void => {
                    callback(response);
                }, 0).ref();
            }
        }

        super.handler(request, (response:any) => {

            var args:any[]     = request.args || [],
                command:string = <string>args.shift(),
                error:IException;

            try {

                switch (command) {
                    case "ping":
                        response.result = null;
                        handler(response);
                        break;
                    case "stop":
                        response.result = null;
                        handler(response);
                        this.stop();
                        break;
                    case "getContent":
                        this.getContent(<string>args[0], <IRequest>args[1], (errors:Exception[], result:IResponse):void => {
                            response.result = result;
                            if (errors && errors.length) {
                                response.errors = errors.map((error:Exception):IObject => {
                                    return error.toObject();
                                });
                            }
                            handler(response);
                        });
                        break;
                    default:
                        error = new Exception({message: "unknown command"});
                        response.errors = [error.toObject()];
                        logger.error(error.getStack());
                        handler(response);
                        break;
                }

            } catch (error) {

                response.errors = ExceptionBase.convertFromError(error).toObject();
                logger.error(ExceptionBase.convertFromError(error).getStack());
                handler(response);

            }

        });
    }

}

export = Daemon;
