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
import display    = require("./lib/displayException");
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
import IStaticResponse  = require("./lib/static/IResponse");

/*var memoryInstance:IMemory = new Memory({

});*/
var staticInstance:IStaticClient = new StaticClient({
    location : config.getStaticSocket(),
    /*timeout  : 123,
    debug    : true*/
});

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
            binary   : config.SERVER_BINARY,
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
            binary   : config.SERVER_BINARY,
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

    ():void => {
        if (config.DEBUG) {
            process.stdout.write("Start http daemon");
        }

        function handler(error:NodeJS.ErrnoException):void {
            if (error) {
                if (config.DEBUG) {
                    process.stdout.write("\n");
                }
                display(Exception.convertFromError(error));
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

            response.setHeader("Server", [config.getServerName(), config.getServerVersion()].join("/"));

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

                (next:() => void):void => {
                    var headers:any = request.headers || {},
                        gzipAllowed:boolean = String(headers["accept-encoding"]).split(", ").indexOf("gzip") !== -1;
                    staticInstance.getContent(pathname, (errors:IStaticException[], result:IStaticResponse):void => {
                        var modified:number = Date.parse(request.headers["if-modified-since"]),
                            date:number = result && result.date ? 1000 * result.date : 0;
                        if (errors && errors.length) {
                            response.setHeader("Content-Type", "text/html; charset=utf-8");
                            response.writeHead(500);
                            response.end(error500({
                                serverName    : config.getServerName(),
                                serverVersion : config.getServerVersion()
                            }, errors));
                        } else if (modified && modified === date) {
                            response.writeHead(304);
                            response.end();
                        } else if (result && result.zipContent && gzipAllowed) {
                            response.writeHead(200);
                            response.setHeader("Content-Type", result.type);
                            response.setHeader("Last-Modified", new Date(result.date * 1000)).toUTCString();
                            response.setHeader("Content-Encoding", "gzip");
                            response.end(result.zipContent);
                        } else if (result && result.content) {
                            response.writeHead(200);
                            response.setHeader("Content-Type", result.type);
                            response.setHeader("Last-Modified", new Date(result.date * 1000)).toUTCString();
                            response.end(result.content);
                        } else {
                            next();
                        }
                    });
                },

                // 404 page
                ():void => {
                    response.writeHead(404);
                    response.setHeader("Content-Type", "text/html; charset=utf-8");
                    response.end(error404({
                        serverName    : config.getServerName(),
                        serverVersion : config.getServerVersion()
                    }));
                }
            ]);


        });

        server.addListener("error", handler);
        server.listen(config.getPort(), config.getHostname(), handler);

    }

]);