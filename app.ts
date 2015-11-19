/// <reference path="./types/node/node.d.ts" />

import fs         = require("fs");
import cp         = require("child_process");
import colors     = require("colors");
import http       = require("http");
import url        = require("url");
import path       = require("path");
import {deferred, mkdir, displayException, installMapping} from "./lib/utils";
import {input as displayInput, output as displayOutput} from "./lib/helpers/display";
import {IException, Exception} from "./lib/exception";
import {init as memoryInit} from "./lib/memory/init";
import staticInit = require("./lib/static/init");
import ContentType      = require("./lib/helpers/ContentType");
import {router as content} from "./lib/static/router";
import {router as redirect} from "./lib/routes/redirect";
import {router as error404} from "./lib/routes/error404";
import {
    DEBUG,
    PROJECT_ENV,
    PROJECT_TEMPORARY_DIRECTORY,
    PROJECT_MEMORY_SOCKET,
    PROJECT_STATIC_SOCKET,
    PROJECT_CSS_SOCKET,
    PROJECT_LESS_SOCKET,
    PROJECT_SASS_SOCKET,
    PROJECT_STYLUS_SOCKET,
    PROJECT_LOGS_DIRECTORY,
    PROJECT_PUBLIC_DIRECTORY,
    SERVER_BINARY,
    PROJECT_DIRECTORY,
    PROJECT_SERVER_NAME,
    PROJECT_SERVER_VERSION,
    PROJECT_SERVER_CHARSET,
    PROJECT_SERVER_PORT,
    PROJECT_SERVER_HOSTNAME
} from "./config";

installMapping();

process.addListener('uncaughtException', function (error:Error) {
    displayException(Exception.convertFromError(error));
});

deferred([

    /***************************************************************************
     * CREATE DIRECTORIES
     **************************************************************************/
    (next:() => void):void => {
        deferred([
            // temporary
            (next:() => void):void => {
                displayInput(DEBUG, "Command: {0} {1}", PROJECT_ENV, ["rm", "-rf", PROJECT_TEMPORARY_DIRECTORY].map((item:string):string => {
                    return JSON.stringify(item);
                }).join(" "));
                cp.spawn(PROJECT_ENV, ["rm", "-rf", PROJECT_TEMPORARY_DIRECTORY], {}).on("close", ():void => {
                    // todo: show errors
                    displayOutput(DEBUG, "done");
                    next();
                });
            },
            (next:() => void):void => {
                displayInput(DEBUG, "Create temporary directory: {0}", JSON.stringify(PROJECT_TEMPORARY_DIRECTORY));
                mkdir(PROJECT_TEMPORARY_DIRECTORY, (errors:IException[]):void => {
                    if (errors && errors.length) {
                        errors.forEach((error:IException):void => {
                            displayException(error);
                        });
                    } else {
                        displayOutput(DEBUG, "done");
                        next();
                    }
                });
            },
            (next:() => void):void => {
                var directory:string = path.dirname(PROJECT_MEMORY_SOCKET);
                displayInput(DEBUG, "Create temporary directory for memory: {0}", JSON.stringify(directory));
                mkdir(directory, (errors:IException[]):void => {
                    if (errors && errors.length) {
                        errors.forEach((error:IException):void => {
                            displayException(error);
                        });
                    } else {
                        displayOutput(DEBUG, "done");
                        next();
                    }
                });
            },
            (next:() => void):void => {
                var directory:string = path.dirname(PROJECT_STATIC_SOCKET);
                displayInput(DEBUG, "Create temporary directory for static: {0}", JSON.stringify(directory));
                mkdir(directory, (errors:IException[]):void => {
                    if (errors && errors.length) {
                        errors.forEach((error:IException):void => {
                            displayException(error);
                        });
                    } else {
                        displayOutput(DEBUG, "done");
                        next();
                    }
                });
            },
            (next:() => void):void => {
                var directory:string = path.dirname(PROJECT_CSS_SOCKET);
                displayInput(DEBUG, "Create temporary directory for css: {0}", JSON.stringify(directory));
                mkdir(directory, (errors:IException[]):void => {
                    if (errors && errors.length) {
                        errors.forEach((error:IException):void => {
                            displayException(error);
                        });
                    } else {
                        displayOutput(DEBUG, "done");
                        next();
                    }
                });
            },
            (next:() => void):void => {
                var directory:string = path.dirname(PROJECT_LESS_SOCKET);
                displayInput(DEBUG, "Create temporary directory for less: {0}", JSON.stringify(directory));
                mkdir(directory, (errors:IException[]):void => {
                    if (errors && errors.length) {
                        errors.forEach((error:IException):void => {
                            displayException(error);
                        });
                    } else {
                        displayOutput(DEBUG, "done");
                        next();
                    }
                });
            },
            (next:() => void):void => {
                var directory:string = path.dirname(PROJECT_SASS_SOCKET);
                displayInput(DEBUG, "Create temporary directory for sass: {0}", JSON.stringify(directory));
                mkdir(directory, (errors:IException[]):void => {
                    if (errors && errors.length) {
                        errors.forEach((error:IException):void => {
                            displayException(error);
                        });
                    } else {
                        displayOutput(DEBUG, "done");
                        next();
                    }
                });
            },
            (next:() => void):void => {
                var directory:string = path.dirname(PROJECT_STYLUS_SOCKET);
                displayInput(DEBUG, "Create temporary directory for stylus: {0}", JSON.stringify(directory));
                mkdir(directory, (errors:IException[]):void => {
                    if (errors && errors.length) {
                        errors.forEach((error:IException):void => {
                            displayException(error);
                        });
                    } else {
                        displayOutput(DEBUG, "done");
                        next();
                    }
                });
            },
            // logs
            (next:() => void):void => {
                displayInput(DEBUG, "Create logs directory: {0}", JSON.stringify(PROJECT_LOGS_DIRECTORY));
                mkdir(PROJECT_LOGS_DIRECTORY, (errors:IException[]):void => {
                    if (errors && errors.length) {
                        errors.forEach((error:IException):void => {
                            displayException(error);
                        });
                    } else {
                        displayOutput(DEBUG, "done");
                        next();
                    }
                });
            },
            // public
            (next:() => void):void => {
                displayInput(DEBUG, "Create public directory: {0}", JSON.stringify(PROJECT_PUBLIC_DIRECTORY));
                mkdir(PROJECT_PUBLIC_DIRECTORY, (errors:IException[]):void => {
                    if (errors && errors.length) {
                        errors.forEach((error:IException):void => {
                            displayException(error);
                        });
                    } else {
                        displayOutput(DEBUG, "done");
                        next();
                    }
                });
            },
            ():void => {
                next();
            }
        ]);
    },

    /***************************************************************************
     * INIT MEMORY SOCKET
     **************************************************************************/
    (next:() => void):void => {
        displayInput(DEBUG, "Memory init");
        memoryInit({
            binaryDirectory  : SERVER_BINARY,
            socketLocation   : PROJECT_MEMORY_SOCKET,
            projectDirectory : PROJECT_DIRECTORY,
            debug            : DEBUG
        }, (errors?:IException[]):void => {
            if (errors && errors.length) {
                errors.forEach((error:IException):void => {
                    displayException(error);
                });
            } else {
                displayOutput(DEBUG, "done");
                next();
            }
        });
    },

    /***************************************************************************
     * INIT STATIC SOCKET
     **************************************************************************/
    (next:() => void):void => {
        // todo: use via parameter, without
        displayInput(DEBUG, "Static init");
        staticInit((errors?:IException[]):void => {
            if (errors && errors.length) {
                errors.forEach((error:IException):void => {
                    displayException(error);
                });
            } else {
                displayOutput(DEBUG, "done");
                next();
            }
        });
    },

    /***************************************************************************
     * START HTTP SERVER
     **************************************************************************/
    ():void => {

        displayInput(DEBUG, "Web init");

        function handler(error:NodeJS.ErrnoException):void {
            if (error) {
                displayException(Exception.convertFromError(error));
                server.close(() => {
                    process.exit(1);
                });
            } else {
                displayOutput(DEBUG, "done");
            }
            server.removeListener("error", handler);
        }

        var server:http.Server = http.createServer((request:http.ServerRequest, response:http.ServerResponse):void => {

            var options:url.Url  = url.parse(request.url),
                method:string    = (request.method || "GET").toUpperCase(),
                query:string     = <string>options.query || "",
                pathname:string  = options.pathname || "/",
                directory:string = path.dirname(pathname),
                extension:string = path.extname(pathname).toLowerCase(),
                filename:string  = path.basename(pathname, extension);

            // headers
            response.setHeader("Server", [
                PROJECT_SERVER_NAME,
                PROJECT_SERVER_VERSION
            ].join("/"));

            deferred([

                // redirect
                redirect({
                    request  : request,
                    response : response,
                    filename : pathname,
                    method   : method,
                    query    : query
                }),

                // todo: insert less, sass, stylus, babel, typescript and etc. routers

                // content
                content({
                    request  : request,
                    response : response,
                    filename : pathname,
                    socket   : PROJECT_STATIC_SOCKET,
                    timeout  : 300, // todo: use via config
                    debug    : DEBUG,
                    server   : {
                        name    : PROJECT_SERVER_NAME,
                        charset : PROJECT_SERVER_CHARSET,
                        version : PROJECT_SERVER_VERSION
                    }
                }),

                // error
                error404({
                    request  : request,
                    response : response,
                    server   : {
                        name    : PROJECT_SERVER_NAME,
                        charset : PROJECT_SERVER_CHARSET,
                        version : PROJECT_SERVER_VERSION
                    }
                })

            ]);

        });

        server.addListener("error", handler);
        server.listen(PROJECT_SERVER_PORT,
            PROJECT_SERVER_HOSTNAME, handler);

    }

]);