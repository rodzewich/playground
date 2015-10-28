import fs         = require("fs");
import cp         = require("child_process");
import mkdir      = require("./lib/mkdir");
import config     = require("./config");
import deferred   = require("./lib/deferred");
import memoryInit = require("./lib/memory/init");
import staticInit = require("./lib/static/init");
import display    = require("./lib/displayException");

deferred([

    // adjust logs directory
    (next:() => void):void => {
        mkdir(config.getLogsDirectory(), (error?:IException):void => {
            if (error) {
                display(error);
            } else {
                next();
            }
        })
    },

    // adjust temporary directory
    (next:() => void):void => {
        deferred([
            (next:() => void):void => {
                cp.spawn(config.getEnvironment(), ["rm", "-rf", config.getTemporaryDirectory()], {}).on('close', ():void => {
                    next();
                });
            },
            (next:() => void):void => {
                mkdir(config.getTemporaryDirectory(), (error?:IException):void => {
                    if (error) {
                        display(error);
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

    // init memory daemon
    (next:() => void):void => {
        memoryInit({
            location : config.getMemorySocket(),
            binary   : config.BINARY_DIRECTORY,
            cwd      : config.PROJECT_DIRECTORY
        }, (errors?:IException[]):void => {
            if (errors && errors.length) {
                errors.forEach((error:IException):void => {
                    display(error);
                });
            } else {
                next();
            }
        });
    },

    // init static daemon
    (next:() => void):void => {
        staticInit({
        }, (errors?:IException[]):void => {
            if (errors && errors.length) {
                errors.forEach((error:IException):void => {
                    display(error);
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

    }
]);