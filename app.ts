/// <reference path="./types/node/node.d.ts" />

import fs         = require("fs");
import cp         = require("child_process");
import mkdir      = require("./lib/mkdir");
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
import {deferred} from "./lib/utils";
import Exception  = require("./lib/exception/Exception");
import IException = require("./lib/exception/IException");
import memoryInit = require("./lib/memory/init/init");
import staticInit = require("./lib/static/init");
import colors     = require("colors");
import http       = require("http");
import url        = require("url");
import path       = require("path");
import displayException = require("./lib/displayException");
import ContentType      = require("./lib/helpers/ContentType");
import content          = require("./lib/static/router/router");
import redirect         = require("./lib/routes/redirect/router");
import error404         = require("./lib/routes/error404/router");

require("./lib/mapping");

function ok():void {
    process.stdout.write(" [ " + colors.green("ok") + " ] \n");
}

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
                cp.spawn(PROJECT_ENV, ["rm", "-rf", PROJECT_TEMPORARY_DIRECTORY], {}).on("close", ():void => {
                    // todo: show errors
                    next();
                });
            },
            (next:() => void):void => {
                mkdir(PROJECT_TEMPORARY_DIRECTORY, (errors:IException[]):void => {
                    if (errors && errors.length) {
                        errors.forEach((error:IException):void => {
                            displayException(error);
                        });
                    } else {
                        next();
                    }
                });
            },
            (next:() => void):void => {
                var directory:string = path.dirname(PROJECT_MEMORY_SOCKET);
                mkdir(directory, (errors:IException[]):void => {
                    if (errors && errors.length) {
                        errors.forEach((error:IException):void => {
                            displayException(error);
                        });
                    } else {
                        next();
                    }
                });
            },
            (next:() => void):void => {
                var directory:string = path.dirname(PROJECT_STATIC_SOCKET);
                mkdir(directory, (errors:IException[]):void => {
                    if (errors && errors.length) {
                        errors.forEach((error:IException):void => {
                            displayException(error);
                        });
                    } else {
                        next();
                    }
                });
            },
            (next:() => void):void => {
                var directory:string = path.dirname(PROJECT_CSS_SOCKET);
                mkdir(directory, (errors:IException[]):void => {
                    if (errors && errors.length) {
                        errors.forEach((error:IException):void => {
                            displayException(error);
                        });
                    } else {
                        next();
                    }
                });
            },
            (next:() => void):void => {
                var directory:string = path.dirname(PROJECT_LESS_SOCKET);
                mkdir(directory, (errors:IException[]):void => {
                    if (errors && errors.length) {
                        errors.forEach((error:IException):void => {
                            displayException(error);
                        });
                    } else {
                        next();
                    }
                });
            },
            (next:() => void):void => {
                var directory:string = path.dirname(PROJECT_SASS_SOCKET);
                mkdir(directory, (errors:IException[]):void => {
                    if (errors && errors.length) {
                        errors.forEach((error:IException):void => {
                            displayException(error);
                        });
                    } else {
                        next();
                    }
                });
            },
            (next:() => void):void => {
                var directory:string = path.dirname(PROJECT_STYLUS_SOCKET);
                mkdir(directory, (errors:IException[]):void => {
                    if (errors && errors.length) {
                        errors.forEach((error:IException):void => {
                            displayException(error);
                        });
                    } else {
                        next();
                    }
                });
            },
            // logs
            (next:() => void):void => {
                mkdir(PROJECT_LOGS_DIRECTORY, (errors:IException[]):void => {
                    if (errors && errors.length) {
                        errors.forEach((error:IException):void => {
                            displayException(error);
                        });
                    } else {
                        next();
                    }
                });
            },
            // public
            (next:() => void):void => {
                mkdir(PROJECT_PUBLIC_DIRECTORY, (errors:IException[]):void => {
                    if (errors && errors.length) {
                        errors.forEach((error:IException):void => {
                            displayException(error);
                        });
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

    /***************************************************************************
     * INIT MEMORY SOCKET
     **************************************************************************/
    (next:() => void):void => {
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
                next();
            }
        });
    },

    /***************************************************************************
     * INIT STATIC SOCKET
     **************************************************************************/
    (next:() => void):void => {
        // todo: use via parameter, without
        staticInit((errors?:IException[]):void => {
            if (errors && errors.length) {
                errors.forEach((error:IException):void => {
                    displayException(error);
                });
            } else {
                next();
            }
        });
    },

    /***************************************************************************
     * START HTTP SERVER
     **************************************************************************/
    ():void => {

        function handler(error:NodeJS.ErrnoException):void {
            if (error) {
                displayException(Exception.convertFromError(error));
                server.close(() => {
                    process.exit(1);
                });
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