/// <reference path="./base.ts" />
/// <reference path="../../types/node/node.d.ts" />
/// <reference path="../../types/glob/glob.d.ts" />
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
import mkdir = require("../mkdir");
import typeOf = require("../typeOf");
import IManager = require("../less/manager/IManager");
import Manager = require("../less/manager/Manager");
import IResponse = require("../less/client/IResponse");
import log4js      = require("../../logger");
import glob = require("glob");

var manager:IManager,
    logger:log4js.Logger = log4js.getLogger("router");

export interface RouterOptions extends base.RouterOptions {
    webRootDirectory: string;
}

export interface InitOptions extends base.InitOptions {
    temporaryDirectory: string;
    sourcesDirectory: string;
    memoryLocation: string;
    useCache: boolean;
    errorBackgroundColor: string;
    errorTextColor: string;
    errorBlockPadding: string;
    errorFontSize: string;
    webRootDirectory: string;
    numberOfProcesses: number;
    sourcesDirectory: string;
}

export function init(options:InitOptions, done:(errors?:Error[]) => void):void {
    var temporaryDirectory:string = options.temporaryDirectory,
        memoryLocation:string = options.memoryLocation,
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
                    done([error]);
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
                            webRootDirectory: webRootDirectory,
                            errorBackgroundColor: errorBackgroundColor,
                            errorTextColor: errorTextColor,
                            errorBlockPadding: errorBlockPadding,
                            errorFontSize: errorFontSize,
                            numberOfProcesses: numberOfProcesses,
                            useCache: true
                        });
                        manager.connect((errors:Error[]):void => {
                            if (!errors || !errors.length) {
                                next();
                            } else if (typeOf(done) === "function") {
                                done(errors && errors.length ? errors : null);
                            }
                        });
                    },
                    (next:() => void):void => {
                        // todo: compile
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
        object:url.Url = url.parse(request.url, true) || {},
        filename:string = path.relative(webRootDirectory, String(object.pathname || "/"));
    deferred([
        (next:() => void):void => {
            var extension:string = filename.substr(-4).toLowerCase(),
                pathname:string = filename.substr(0, filename.length - 4);
            if (extension === ".css") {
                manager.compile(pathname, (errors?:Error[], result?:IResponse):void => {
                    var modified:number,
                        date:number;
                    if ((!errors || !errors.length) && result) {
                        modified = Date.parse(request.headers["if-modified-since"]);
                        date = 1000 * result.date;
                        if (modified && modified === date) {
                            response.writeHead(304);
                            response.end();
                        } else {
                            response.writeHead(200, {
                                "Content-Type": "text/css; charset=utf-8",
                                "Last-Modified": (new Date(result.date * 1000)).toUTCString(),
                                "X-SourceMap": path.join(webRootDirectory, pathname + ".css.map")
                            });
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

        },
        (next:() => void):void => {

        },
        ():void => {
            next();
        },
    ]);
}
