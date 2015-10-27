import fs = require("fs");
import cp = require("child_process");
import config = require("./config");
import deferred = require("./lib/deferred");
import memoryInit = require("./lib/memory/init");
import Exception = require("./lib/exception/Exception");
import displayException = require("./lib/displayException");

deferred([
    (next:() => void):void => {
        var temporaryDirectory:string = config.getTemporaryDirectory();
        deferred([
            (next:() => void):void => {
                var rm:cp.ChildProcess = cp.spawn("/usr/bin/env", ["rm", "-rf", temporaryDirectory], {});
                rm.on('close', function () {
                    next();
                });
            },
            (next:() => void):void => {
                fs.mkdir(temporaryDirectory, function (error?:NodeJS.ErrnoException) {
                    if (error) {
                        displayException(Exception.convertFromError(error));
                    } else {
                        next();
                    }
                });
            },
            ():void => {
                next();
            }
        ]);
    },
    (next:() => void):void => {
        memoryInit({
            location : config.getMemorySocket(),
            binary   : config.BINARY_DIRECTORY,
            cwd      : config.PROJECT_DIRECTORY
        }, (errors?:Exception[]):void => {
            if (errors && errors.length) {
                errors.forEach((error:Exception):void => {
                    displayException(error);
                });
            } else {
                next();
            }
        });
    },
    (next:() => void):void => {

    },
    (next:() => void):void => {

    },
    (next:() => void):void => {

    },
    (next:() => void):void => {

    }
]);