/// <reference path="./base.ts" />
/// <reference path="../../types/node/node.d.ts" />
/// <reference path="../../types/glob/glob.d.ts" />
/// <reference path="../deferred.ts" />
/// <reference path="../deferred.ts" />
/// <reference path="../typeOf.ts" />
/// <reference path="../less/manager/IManager.ts" />
/// <reference path="../less/client/IResponse.ts" />
/// <reference path="../../types/log4js/log4js.d.ts" />
/// <reference path="../less/manager/Manager.ts" />
/// <reference path="../mkdir.ts" />

import url = require("url");
import http = require("http");
import path = require("path");
import base = require("./base");
import deferred = require("../deferred");
import parallel = require("../parallel");
import mkdir = require("../mkdir");
import typeOf = require("../typeOf");
import IManager = require("../less/manager/IManager");
import Manager = require("../less/manager/Manager");
import IResponse = require("../less/client/IResponse");
import log4js = require("../../logger");
import glob = require("glob");

var manager:IManager,
    logger:log4js.Logger = log4js.getLogger("router");

export interface RouterOptions extends base.RouterOptions {
    webRootDirectory: string;
    useCache: boolean;
}

export interface InitOptions extends base.InitOptions {
    temporaryDirectory: string;
    includeDirectories: string[];
    sourcesDirectory: string;
    memoryLocation: string;
    useCache: boolean;
    errorBackgroundColor: string;
    errorTextColor: string;
    errorBlockPadding: string;
    errorFontSize: string;
    webRootDirectory: string;
    numberOfProcesses: number;
}

export function init(options:InitOptions, done:(errors?:Error[]) => void):void {
    var temporaryDirectory:string = options.temporaryDirectory,
        memoryLocation:string = options.memoryLocation,
        includeDirectories: string[] = options.includeDirectories,
        sourcesDirectory:string = options.sourcesDirectory,
        webRootDirectory:string = options.webRootDirectory,
        useCache:boolean = options.useCache,
        errorBackgroundColor:string = options.errorBackgroundColor,
        errorTextColor:string = options.errorTextColor,
        errorBlockPadding:string = options.errorBlockPadding,
        errorFontSize:string = options.errorFontSize,
        numberOfProcesses:number = options.numberOfProcesses;
    deferred([
        (next:() => void):void => {
            mkdir(temporaryDirectory, (error?:Error):void => {
                if (error) {
                    if (typeOf(done) === "function") {
                        done([error]);
                    }
                } else {
                    next();
                }
            });
        },
        (next:() => void):void => {
            var manager:IManager;
            if (useCache) {
                deferred([
                    (next:() => void):void => {
                        manager = new Manager({
                            location: path.join(temporaryDirectory, "temp-less.sock"),
                            memoryLocation: memoryLocation,
                            sourcesDirectory: sourcesDirectory,
                            includeDirectories: includeDirectories,
                            webRootDirectory: webRootDirectory,
                            errorBackgroundColor: errorBackgroundColor,
                            errorTextColor: errorTextColor,
                            errorBlockPadding: errorBlockPadding,
                            errorFontSize: errorFontSize,
                            numberOfProcesses: 10,
                            useCache: false
                        });
                        manager.connect((errors:Error[]):void => {
                            if (!errors || !errors.length) {
                                next();
                            } else if (typeOf(done) === "function") {
                                done(errors);
                            }
                        });
                    },
                    (next:() => void):void => {
                        var actions:((done:() => void) => void)[] = [],
                            errors:Error[] = [];
                        glob("**/*.less", {
                            cwd: sourcesDirectory
                        }, (error?: Error, files?: string[]): void => {
                            if (error) {
                                if (typeOf(done) === "function") {
                                    done([error]);
                                }
                            } else {
                                files.forEach((filename:string):void => {
                                    actions.push((done:() => void):void => {
                                        manager.compile(filename, (errs?:Error[]):void => {
                                            if (errs && errs.length) {
                                                errors.concat(errs);
                                            }
                                            done();
                                        });
                                    });
                                });
                            }
                        });
                        parallel(actions, ():void => {
                            if (errors.length) {
                                if (typeOf(done) === "function") {
                                    done(errors);
                                }
                            } else {
                                next();
                            }
                        });
                    },
                    (next:() => void):void => {
                        manager.disconnect((errors?: Error[]): void => {
                            if (!errors || !errors.length) {
                                next();
                            } else if (typeOf(done) === "function") {
                                done(errors && errors.length ? errors : null);
                            }
                        })
                    }
                ]);
            } else {
                next();
            }
        },
        ():void => {
            manager = new Manager({
                location: path.join(temporaryDirectory, "less.sock"),
                memoryLocation: memoryLocation,
                sourcesDirectory: sourcesDirectory,
                includeDirectories: includeDirectories,
                webRootDirectory: webRootDirectory,
                errorBackgroundColor: errorBackgroundColor,
                errorTextColor: errorTextColor,
                errorBlockPadding: errorBlockPadding,
                errorFontSize: errorFontSize,
                numberOfProcesses: numberOfProcesses,
                useCache: useCache
            });
            manager.connect((errors:Error[]):void => {
                if (typeOf(done) === "function") {
                    done(errors && errors.length ? errors : null);
                }
            });
        }
    ]);
}

export function route(options:RouterOptions, next:() => void):void {
    var request:http.ServerRequest = options.request,
        response:http.ServerResponse = options.response,
        webRootDirectory:string = options.webRootDirectory,
        useCache: boolean = options.useCache,
        object:url.Url = url.parse(request.url, true),
        filename:string = path.relative(webRootDirectory, String(object.pathname || "/"));

    deferred([

        (next:() => void):void => {
            var extension:string = filename.substr(-4).toLowerCase(),
                pathname:string = filename.substr(0, filename.length - 4);
            if (extension === ".css") {
                manager.compile(pathname, (errors?:Error[], result?:IResponse):void => {
                    var header: any = {},
                        modified:number,
                        date:number;
                    if ((!errors || !errors.length) && result) {
                        modified = Date.parse(request.headers["if-modified-since"]);
                        date = 1000 * result.date;
                        if (modified && modified === date) {
                            response.writeHead(304);
                            response.end();
                        } else {
                            header["Content-Type"] = "text/css; charset=utf-8";
                            header["Last-Modified"] = (new Date(result.date * 1000)).toUTCString();
                            if (useCache) {
                                header["X-SourceMap"] = path.join(webRootDirectory, pathname + ".css.map");
                            }
                            response.writeHead(200, header);
                            response.end(result.result);
                        }
                    } else if (errors && errors.length) {
                        errors.forEach((error:Error):void => {
                            logger.error("Something went wrong", error);
                        });
                        next();
                    } else {
                        next();
                    }
                });
            } else {
                next();
            }
        },

        (next:() => void):void => {
            var extension = filename.substr(-5).toLowerCase(),
                pathname  = filename.substr(0, filename.length - 5);
            if (useCache) {
                next();
            } else if (extension === ".less") {
                manager.compile(pathname, (errors?:Error[], result?:IResponse):void => {
                    if ((!errors || !errors.length) && result) {
                        var header: any = {},
                            modified = Date.parse(request.headers["if-modified-since"]),
                            date     = 1000 * result.date;
                        if (modified && modified === date) {
                            response.writeHead(304);
                            response.end();
                        } else {
                            header["Content-Type"] = "text/plain; charset=utf-8";
                            header["Last-Modified"] = (new Date(result.date * 1000)).toUTCString();
                            response.writeHead(200, header);
                            response.end(result.source);
                        }
                    } else if (errors && errors.length) {
                        errors.forEach((error:Error):void => {
                            logger.error("Something went wrong", error);
                        });
                        next();
                    } else {
                        next();
                    }
                });
            } else {
                next();
            }
        },

        (next:() => void):void => {
            var extension = filename.substr(-8).toLowerCase(),
                pathname  = filename.substr(0, filename.length - 8);
            if (useCache) {
                next();
            } else if (extension === ".css.map") {
                manager.compile(pathname, (errors?:Error[], result?:IResponse):void => {
                    if ((!errors || !errors.length) && result) {
                        var header: any = {},
                            modified = Date.parse(request.headers["if-modified-since"]),
                            date     = 1000 * result.date;
                        if (modified && modified === date) {
                            response.writeHead(304);
                            response.end();
                        } else {
                            header["Content-Type"] = "application/json; charset=utf-8";
                            header["Last-Modified"] = (new Date(result.date * 1000)).toUTCString();
                            response.writeHead(200, header);
                            response.end(result.map);
                        }
                    } else if (errors && errors.length) {
                        errors.forEach((error:Error):void => {
                            logger.error("Something went wrong", error);
                        });
                        next();
                    } else {
                        next();
                    }
                });
            } else {
                next();
            }
        },

        ():void => {
            next();
        }

    ]);

}
