/// <reference path="./types/node/node.d.ts" />

import fs         = require("fs");
import cp         = require("child_process");
import mkdir      = require("./lib/mkdir");
import config     = require("./config");
import deferred   = require("./lib/deferred");
import Exception  = require("./lib/exception/Exception");
import IException = require("./lib/exception/IException");
import memoryInit = require("./lib/memory/init");
import staticInit = require("./lib/static/init");
import colors     = require("colors");
import http       = require("http");
import url        = require("url");
import path       = require("path");
import error404   = require("./errors/404");
import error500   = require("./errors/500");
import displayException = require("./lib/displayException");
import IStaticClient    = require("./lib/static/client/IClient");
import StaticClient     = require("./lib/static/client/Client");
import IStaticException = require("./lib/static/exception/IException");
import IStaticResponse  = require("./lib/static/client/IResponse");
import ContentType      = require("./lib/helpers/ContentType");
import staticRouter     = require("./lib/static/router/router");

require("./lib/mapping");

function ok():void {
    process.stdout.write(" [ " + colors.green("ok") + " ] \n");
}

process.addListener('uncaughtException', function (error:Error) {
    displayException(Exception.convertFromError(error));
});

deferred([

    // create directories
    (next:() => void):void => {
        deferred([
            // temporary
            (next:() => void):void => {
                cp.spawn(config.PROJECT_ENV, ["rm", "-rf", config.PROJECT_TEMPORARY_DIRECTORY], {}).on("close", ():void => {
                    // todo: show errors
                    next();
                });
            },
            (next:() => void):void => {
                mkdir(config.PROJECT_TEMPORARY_DIRECTORY, (errors:IException[]):void => {
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
                var directory:string = path.dirname(config.PROJECT_MEMORY_SOCKET);
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
                var directory:string = path.dirname(config.PROJECT_STATIC_SOCKET);
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
                var directory:string = path.dirname(config.PROJECT_CSS_SOCKET);
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
                var directory:string = path.dirname(config.PROJECT_LESS_SOCKET);
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
                var directory:string = path.dirname(config.PROJECT_SASS_SOCKET);
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
                var directory:string = path.dirname(config.PROJECT_STYLUS_SOCKET);
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
                mkdir(config.PROJECT_LOGS_DIRECTORY, (errors:IException[]):void => {
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
                mkdir(config.PROJECT_PUBLIC_DIRECTORY, (errors:IException[]):void => {
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
        memoryInit((errors?:IException[]):void => {
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

    ():void => {
        if (config.DEBUG) {
            process.stdout.write("Start http daemon");
        }

        function handler(error:NodeJS.ErrnoException):void {
            if (error) {
                if (config.DEBUG) {
                    process.stdout.write("\n");
                }
                displayException(Exception.convertFromError(error));
                server.close();
            } else {
                if (config.DEBUG) {
                    ok();
                }
            }
            server.removeListener("error", handler);

        }

        var server:http.Server = http.createServer(function (request, response) {

            var options:url.Url = url.parse(request.url),
                method:string   = (request.method || "GET").toUpperCase(),
                query:string    = <string>options.query || "",
                pathname:string = options.pathname || "/",
                directory:string,
                extension:string,
                filename:string;

            response.setHeader("Server", [
                config.PROJECT_SERVER_NAME,
                config.PROJECT_SERVER_VERSION
            ].join("/"));

            deferred([

                // redirect
                (next:() => void):void => {
                    var resolved:string = path.normalize(pathname);
                    if (method === "GET" && pathname !== resolved) {
                        response.writeHead(301);
                        response.setHeader("Location", resolved + (query ? "?" + query : query));
                        response.end();
                    } else {
                        directory = path.dirname(resolved);
                        extension = path.extname(resolved).toLowerCase();
                        filename  = path.basename(resolved, extension);
                        next();
                    }
                },

                // static content
                staticRouter({
                    request  : request,
                    response : response,
                    filename : pathname
                }),

                // 404 page
                ():void => {
                    response.setHeader("Content-Type", ContentType.HTML.toString(config.PROJECT_SERVER_CHARSET));
                    response.writeHead(404);
                    response.end(error404({
                        serverName    : config.PROJECT_SERVER_NAME,
                        serverVersion : config.PROJECT_SERVER_VERSION
                    }));
                }
            ]);


        });

        server.addListener("error", handler);
        server.listen(config.PROJECT_SERVER_PORT, config.PROJECT_SERVER_HOSTNAME, handler);

    }

]);