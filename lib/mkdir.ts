/// <reference path="../types/node/node.d.ts" />

import fs         = require("fs");
import path       = require("path");
import deferred   = require("./deferred");
import isFunction = require("./isFunction");
import Exception  = require("./exception/Exception");
import IException = require("./exception/IException");

function mkdir(directory:string, callback?:(error:IException) => void):void {
    function handler(error:IException) {
        if (isFunction(callback)) {
            callback(error);
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
                    handler(Exception.convertFromError(error), {
                        code    : error.code,
                        errno   : error.errno,
                        path    : error.path,
                        syscall : error.syscall
                    });
                }
            });
        },
        (next:() => void):void => {
            mkdir(path.dirname(directory), (error:IException):void => {
                if (error) {
                    handler(error);
                } else {
                    next();
                }
            });
        },
        ():void => {
            fs.mkdir(directory, (error:NodeJS.ErrnoException):void => {
                if (error) {
                    handler(Exception.convertFromError(error), {
                        code    : error.code,
                        errno   : error.errno,
                        path    : error.path,
                        syscall : error.syscall
                    });
                } else {
                    handler(null);
                }
            });
        }
    ]);
}

export = mkdir;
