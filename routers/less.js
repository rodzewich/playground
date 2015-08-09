/*jslint */
/*global module, require */

var fs            = require("fs"),
    url           = require("url"),
    path          = require("path"),
    typeOf        = require("../lib/typeOf"),
    deferred      = require("../lib/deferred"),
    WorkerManager = require("../lib/less/WorkerManager"),
    manager;

function init(options, callback) {
    "use strict";

    var temporaryDirectory = path.join(options.temporaryDirectory, "less");
    // todo: check is absolute

    deferred([

        function (next) {
            // todo: рекурсивно создавать директорию
            fs.mkdir(temporaryDirectory, function () {
                next();
            });
        },

        function () {
            manager = new WorkerManager({
                numberOfProcesses    : options.numberOfProcesses, // todo: check value
                sourcesDirectory     : options.sourcesDirectory, // todo: check directory
                importDirectories    : options.importDirectories, // todo: check directories
                temporaryDirectory   : temporaryDirectory, // todo: check directory
                memorySocketLocation : options.memorySocketLocation, // todo: check location
                useCache             : !!options.useCache
            });
            manager.connect(function (errors) {
                if (typeOf(callback) === "function") {
                    callback(errors && errors.length ? errors : null);
                }
            });
        }
    ]);
}

function route(options, next) {
    "use strict";

    var rootDirectory = path.join("/", options.rootDirectory || ""),
        httpServer    = options.httpServer,
        httpRequest   = options.httpRequest,
        httpResponse  = options.httpResponse,
        request       = url.parse(httpRequest.url, true) || {},
        filename      = path.relative(rootDirectory, String(request.pathname || "/"));

    deferred([
        function (next) {
            var extension = filename.substr(-4).toLowerCase(),
                pathname  = filename.substr(0, filename.length - 4);
            if (extension === ".css") {
                manager.compile(pathname, function (result) {
                    if (result) {
                        var modified = Date.parse(httpRequest.headers["if-modified-since"]),
                            date     = 1000 * result.date;
                        if (modified && modified === date) {
                            httpResponse.writeHead(304, httpServer.STATUS_CODES[304]);
                            httpResponse.end();
                        } else {
                            httpResponse.writeHead(200, httpServer.STATUS_CODES[200], {
                                "Content-Type"  : "text/css; charset=utf-8",
                                "X-SourceMap"   : pathname + ".css.map",
                                "Last-Modified" : (new Date(result.date * 1000)).toUTCString()
                            });
                            httpResponse.end(result.css);
                        }
                    } else {
                        next();
                    }
                });
            } else {
                next();
            }
        },

        function (next) {
            var extension = filename.substr(-5).toLowerCase(),
                pathname  = filename.substr(0, filename.length - 5);
            if (extension === ".less") {
                manager.compile(pathname, function (result) {
                    if (result) {
                        var modified = Date.parse(httpRequest.headers["if-modified-since"]),// todo: error place
                            date     = 1000 * result.date;
                        if (modified && modified === date) {
                            httpResponse.writeHead(304, httpServer.STATUS_CODES[304]);
                            httpResponse.end();
                        } else {
                            httpResponse.writeHead(200, httpServer.STATUS_CODES[200], {
                                "Content-Type"  : "text/plain; charset=utf-8",
                                "Last-Modified" : (new Date(result.date * 1000)).toUTCString()
                            });
                            httpResponse.end(result.less);
                        }
                    } else {
                        next();
                    }
                });
            } else {
                next();
            }
        },

        function (next) {
            var extension = filename.substr(-8).toLowerCase(),
                pathname  = filename.substr(0, filename.length - 8);
            if (extension === ".css.map") {
                manager.compile(pathname, function (result) {
                    if (result) {
                        var modified = Date.parse(httpRequest.headers["if-modified-since"]),
                            date     = 1000 * result.date;
                        if (modified && modified === date) {
                            httpResponse.writeHead(304, httpServer.STATUS_CODES[304]);
                            httpResponse.end();
                        } else {
                            httpResponse.writeHead(200, httpServer.STATUS_CODES[200], {
                                "Content-Type"  : "application/json; charset=utf-8",
                                "Last-Modified" : (new Date(result.date * 1000)).toUTCString()
                            });
                            httpResponse.end(result.map);
                        }
                    } else {
                        next();
                    }
                });
            } else {
                next();
            }
        },

        function () {
            next();
        }
    ]);

}

module.exports = {
    init  : init,
    route : route
};
