/// <reference path="../types/node/node.d.ts" />

import fs           = require("fs");
import path         = require("path");
import deferred     = require("./deferred");
import {isFunction} from "./utils";
import Exception    = require("./exception/Exception");
import IException   = require("./exception/IException");

function mkdir(directory:string, callback?:(errors:IException[]) => void):void {

    function handler(errors:IException[]) {
        if (isFunction(callback)) {
            callback(errors);
        }
    }

    deferred([
        (next:() => void):void => {
            fs.mkdir(directory, (error:NodeJS.ErrnoException):void => {
                if (!error || error.code === "EEXIST") {
                    handler(null);
                } else if (error.code === "ENOENT") {
                    next();
                } else {
                    handler([Exception.convertFromError(error, {
                        code    : error.code,
                        errno   : error.errno,
                        path    : error.path,
                        syscall : error.syscall
                    })]);
                }
            });
        },
        (next:() => void):void => {
            mkdir(path.dirname(directory), (errors:IException[]):void => {
                if (errors && errors.length) {
                    handler(errors);
                } else {
                    next();
                }
            });
        },
        ():void => {
            fs.mkdir(directory, (error:NodeJS.ErrnoException):void => {
                if (error) {
                    handler([Exception.convertFromError(error, {
                        code    : error.code,
                        errno   : error.errno,
                        path    : error.path,
                        syscall : error.syscall
                    })]);
                } else {
                    handler(null);
                }
            });
        }
    ]);
}

export = mkdir;
