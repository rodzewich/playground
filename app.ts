/// <reference path="./types/node/node.d.ts" />

import fs         = require("fs");
import cp         = require("child_process");
import mkdir      = require("./lib/mkdir");
import config     = require("./config");
import deferred   = require("./lib/deferred");
import Exception  = require("./lib/exception/Exception");
import IException  = require("./lib/exception/IException");
import memoryInit = require("./lib/memory/init");
import staticInit = require("./lib/static/init");
import display    = require("./lib/displayException");
import colors     = require("colors");
import displayException = require("./lib/displayException");
require("./lib/mapping");

function ok():void {
    process.stdout.write(" [ " + colors.green("ok") + " ] \n");
}

process.addListener('uncaughtException', function (error:Error) {
    displayException(Exception.convertFromError(error));
});

deferred([

    // adjust logs directory
    (next:() => void):void => {
        if (config.DEBUG) {
            process.stdout.write("Create logs directory");
        }
        mkdir(config.getLogsDirectory(), (errors?:IException[]):void => {
            if (errors && errors.length) {
                if (config.DEBUG) {
                    process.stdout.write("\n");
                }
                errors.forEach((error:IException):void => {
                    display(error);
                });
            } else {
                if (config.DEBUG) {
                    ok();
                }
                next();
            }
        })
    },

    // adjust temporary directory
    (next:() => void):void => {
        if (config.DEBUG) {
            process.stdout.write("Clear temporary directory");
        }
        deferred([
            (next:() => void):void => {
                cp.spawn(config.getEnvironment(), ["rm", "-rf", config.getTemporaryDirectory()], {}).on("close", ():void => {
                    next();
                });
            },
            (next:() => void):void => {
                mkdir(config.getTemporaryDirectory(), (errors?:IException[]):void => {
                    if (errors && errors.length) {
                        if (config.DEBUG) {
                            process.stdout.write("\n");
                        }
                        errors.forEach((error:IException):void => {
                            display(error);
                        });
                    } else {
                        if (config.DEBUG) {
                            ok();
                        }
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
        if (config.DEBUG) {
            process.stdout.write("Init memory daemon");
        }
        memoryInit({
            debug    : false, //config.DEBUG,
            location : config.getMemorySocket(),
            binary   : config.BINARY_DIRECTORY,
            cwd      : config.PROJECT_DIRECTORY
        }, (errors?:IException[]):void => {
            if (errors && errors.length) {
                if (config.DEBUG) {
                    process.stdout.write("\n");
                }
                errors.forEach((error:IException):void => {
                    display(error);
                });
            } else {
                if (config.DEBUG) {
                    ok();
                }
                next();
            }
        });
    },

    // init static daemon
    (next:() => void):void => {
        if (config.DEBUG) {
            process.stdout.write("Init static daemon");
        }
        staticInit({
            debug    : false, //config.DEBUG,
            location : config.getStaticSocket(),
            binary   : config.BINARY_DIRECTORY,
            cwd      : config.PROJECT_DIRECTORY
        }, (errors?:IException[]):void => {
            if (errors && errors.length) {
                if (config.DEBUG) {
                    process.stdout.write("\n");
                }
                errors.forEach((error:IException):void => {
                    display(error);
                });
            } else {
                if (config.DEBUG) {
                    ok();
                }
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