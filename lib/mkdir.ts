/// <reference path="../types/node/node.d.ts" />

import fs         = require("fs");
import path       = require("path");
import deferred   = require("./deferred");
import Exception  = require("./exception/Exception");
import IException = require("./exception/IException");

function mkdir(directory:string, callback:(error:IException) => void):void {
    deferred([
        (next:() => void):void => {
            fs.mkdir(directory, (error:NodeJS.ErrnoException):void => {
                if (!error || error.code === "EEXIST") {
                    callback(null);
                } else if (error.code === "ENOENT") {
                    next();
                } else {
                    callback(Exception.convertFromError(error), {
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
                    callback(error);
                } else {
                    next();
                }
            });
        },
        ():void => {
            fs.mkdir(directory, (error:NodeJS.ErrnoException):void => {
                if (error) {
                    callback(Exception.convertFromError(error), {
                        code    : error.code,
                        errno   : error.errno,
                        path    : error.path,
                        syscall : error.syscall
                    });
                } else {
                    callback(null);
                }
            });
        }
    ]);
}

export = mkdir;
