/// <reference path="./base.ts" />
/// <reference path="../../types/node/node.d.ts" />
/// <reference path="../deferred.ts" />
/// <reference path="../typeOf.ts" />
/// <reference path="../less/manager/IManager.ts" />
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

var manager:IManager;

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
    if (useCache) {
        // todo: отдельный кейс сборки
    } else {
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
            useCache: false
        });
        manager.connect((errors:Error[]):void => {
            if (typeOf(done) === "function") {
                done(errors && errors.length ? errors : null);
            }
        });
    }
}

export function route(options:RouterOptions, next:() => void):void {
    var server:http.Server = options.server,
        request:http.ServerRequest = options.request,
        response:http.ServerResponse = options.response,
        webRootDirectory:string = options.webRootDirectory,
        object:url.Url = url.parse(request.url, true) || {},
        filename:string = path.relative(webRootDirectory, String(object.pathname || "/"));
    deferred([
        (next:() => void):void => {
            var extension:string = filename.substr(-4).toLowerCase(),
                pathname:string = filename.substr(0, filename.length - 4);
            if (extension === ".css") {
                manager.compile(pathname, (errors?: Error[], result?: any): void => {
                    if (result) {
                        var modified = Date.parse(request.headers["if-modified-since"]),
                            date     = 1000 * result.date;
                        if (modified && modified === date) {
                            response.writeHead(304, server.STATUS_CODES[304]);
                            response.end();
                        } else {
                            response.writeHead(200, server.STATUS_CODES[200], {
                                "Content-Type"  : "text/css; charset=utf-8",
                                "X-SourceMap"   : pathname + ".css.map",
                                "Last-Modified" : (new Date(result.date * 1000)).toUTCString()
                            });
                            response.end(result.css);
                        }
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
