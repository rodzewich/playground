/// <reference path="../../types/log4js/log4js.d.ts" />

import logger = require("log4js");
import {IOptions as IOptionsBase, IDaemon as IDaemonBase, Daemon as DaemonBase} from "../daemon";
import {IRequest, IResponse} from "./client";
import {isDefined, isFunction} from "../utils/common";
import {IException, Exception, IObject} from "./exception";
import {Exception as ExceptionBase} from "../exception";

export interface IOptions extends IOptionsBase {
}

export interface IDaemon extends IDaemonBase {
    compile(request:IRequest, callback:(errors:IException[], response:IResponse) => void): void;
}

export abstract class Daemon extends DaemonBase implements IDaemon {

    constructor(options:IOptions) {
        super(options);
    }

    abstract compile(options:IRequest, callback:(errors:IException[], result:IResponse) => void):void;

    protected handler(request:any, callback:(response:any) => void):void {

        function handler(response:any):void {
            if (isFunction(callback)) {
                setTimeout((): void => {
                    callback(response);
                }, 0).ref();
            }
        }

        super.handler(request, (response:any) => {
            var args:any[] = request.args || [],
                command:string = <string>args.shift(),
                error:IException;

            try {

                switch (command) {
                    case "compile":
                        response.result = null;
                        this.compile(<IRequest>args[0], (errors:IException[], result:IResponse):void => {
                            response.result = result;
                            if (errors && errors.length) {
                                response.errors = errors.map((error:IException):IObject => {
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
