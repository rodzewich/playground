import IClient    = require("./IClient");
import ClientBase = require("../../client/Client");
import log4js     = require("../../../logger");
import IResponse  = require("./IResponse");
import isString   = require("../../isString");
import isFunction = require("../../isFunction");
import IException = require("../exception/IException");
import Exception  = require("../exception/Exception");

var logger:log4js.Logger = log4js.getLogger("memory");

class Client extends ClientBase implements IClient {

    public ping(callback?:(errors:IException[]) => void):void {

        function handler(errors:IException[]):void {
            if (isFunction(callback)) {
                setTimeout(():void => {
                    callback(errors);
                }, 0).ref();
            }
            if (errors) {
                errors.forEach((error:IException):void => {
                    logger.error(error.getStack());
                });
            }
        }

        this.call((errors:IException[]):void => {
            handler(errors && errors.length ? errors : null);
        }, null, "ping");

    }

    public stop(callback?:(errors:IException[]) => void):void {

        function handler(errors:IException[]):void {
            if (isFunction(callback)) {
                setTimeout(():void => {
                    callback(errors);
                }, 0).ref();
            }
            if (errors) {
                errors.forEach((error:IException):void => {
                    logger.error(error.getStack());
                });
            }
        }

        this.call((errors:IException[]):void => {
            handler(errors && errors.length ? errors : null);
        }, null, "stop");

    }

    public getContent(filename:string, callback?:(errors:IException[], response:IResponse) => void):void {

        function handler(errors:IException[], response:IResponse):void {
            if (isFunction(callback)) {
                setTimeout(():void => {
                    callback(errors, response);
                }, 0).ref();
            }
            if (errors) {
                errors.forEach((error:IException):void => {
                    logger.error(error.getStack());
                });
            }
        }

        if (!isString(filename) || !filename) {
            handler([new Exception({message : "filename should be a non empty string"})], null);
        } else {
            this.call((errors:IException[], response:IResponse):void => {
                handler(errors && errors.length ? errors : null,
                    !errors || !errors.length ? response : null);
            }, null, filename);
        }

    }

}

export = Client;
