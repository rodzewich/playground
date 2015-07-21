/*jslint */
/*global require, module */

var fs       = require("fs"),
    url      = require("url"),
    events   = require("events"),
    path     = require("path"),
    deferred = require("../lib/deferred"),
    compiler = require("../lib/typescript/compiler");

function route(options, next) {
    "use strict";

    var rootDirectory    = path.join("/", options.rootDirectory || ""),
        tempDirectory    = options.tempDirectory,
        sourcesDirectory = options.sourcesDirectory,
        httpServer       = options.httpServer,
        httpRequest      = options.httpRequest,
        httpResponse     = options.httpResponse,
        errorHandler     = options.errorHandler,
        request          = url.parse(httpRequest.url, true) || {},
        filename         = path.relative(rootDirectory, String(request.pathname || "/")),
        loaderDate       = null,
        loaderContent    = null,
        loaderLock       = null;

    deferred([

        // todo: use simple content module
        function (next) {
            if (filename === "loader.js") {
                if (loaderContent) {
                    httpResponse.writeHead(200, httpServer.STATUS_CODES[200], {
                        "Content-Type" : "application/javascript; charset=utf-8"
                        //"Last-Modified" : result.date.toUTCString()
                    });
                    httpResponse.end(loaderContent);
                } else if (loaderLock) {
                    loaderLock.addListener("complete", function () {
                        httpResponse.writeHead(200, httpServer.STATUS_CODES[200], {
                            "Content-Type" : "application/javascript; charset=utf-8"
                            //"Last-Modified" : result.date.toUTCString()
                        });
                        httpResponse.end(loaderContent);
                    });
                } else {
                    loaderLock = new events.EventEmitter();
                    fs.readFile(path.resolve(__dirname, "../lib/typescript/loader.js"), function (error, content) {
                        if (!error) {
                            loaderContent = content.toString("utf8");
                            httpResponse.writeHead(200, httpServer.STATUS_CODES[200], {
                                "Content-Type" : "application/javascript; charset=utf-8"
                                //"Last-Modified" : result.date.toUTCString()
                            });
                            httpResponse.end(loaderContent);
                            loaderLock.emit("complete");
                            loaderLock   = null;
                        }
                    });
                }
            } else {
                next();
            }
        },

        function (next) {
            var extension = filename.substr(-3).toLowerCase(),
                pathname  = filename.substr(0, filename.length - 3);
            if (extension === ".js") {
                compiler({
                    basedir       : sourcesDirectory,
                    filename      : pathname,
                    lockTemp      : tempDirectory,
                    lockTimeout   : 100,
                    scriptsTarget : "es5"
                }, function (errors, result) {
                    if (!errors || !errors.length) {
                        if (result) {
                            var modified = Date.parse(httpRequest.headers["if-modified-since"]),
                                date     = 1000 * parseInt(String(Number(result.date) / 1000), 10);
                            if (modified && modified === date) {
                                httpResponse.writeHead(304, httpServer.STATUS_CODES[304]);
                                httpResponse.end();
                            } else {
                                httpResponse.writeHead(200, httpServer.STATUS_CODES[200], {
                                    "Content-Type"  : "application/javascript; charset=utf-8",
                                    "X-SourceMap"   : pathname + ".js.map",
                                    "Last-Modified" : result.date.toUTCString()
                                });
                                httpResponse.end(result.javascript);
                            }
                        } else {
                            next();
                        }
                    } else {
                        if (errors[0].code === "EACCES") {
                            errorHandler(403);
                        } else {
                            errorHandler(500, errors);
                        }
                    }
                });
            } else {
                next();
            }
        },

        function (next) {
            var extension = filename.substr(-3).toLowerCase(),
                pathname  = filename.substr(0, filename.length - 3);
            if (extension === ".ts") {
                compiler({
                    basedir       : sourcesDirectory,
                    filename      : pathname,
                    lockTemp      : tempDirectory,
                    lockTimeout   : 100,
                    scriptsTarget : "es5"
                }, function (errors, result) {
                    if (!errors || !errors.length) {
                        if (result) {
                            var modified = Date.parse(httpRequest.headers["if-modified-since"]),
                                date     = 1000 * parseInt(String(Number(result.date) / 1000), 10);
                            if (modified && modified === date) {
                                httpResponse.writeHead(304, httpServer.STATUS_CODES[304]);
                                httpResponse.end();
                            } else {
                                httpResponse.writeHead(200, httpServer.STATUS_CODES[200], {
                                    "Content-Type"  : "text/plain; charset=utf-8",
                                    "Last-Modified" : result.date.toUTCString()
                                });
                                httpResponse.end(result.typescript);
                            }
                        } else {
                            next();
                        }
                    } else {
                        if (errors[0].code === "EACCES") {
                            errorHandler(403);
                        } else {
                            errorHandler(500, errors);
                        }
                    }
                });
            } else {
                next();
            }
        },

        function (next) {
            var extension = filename.substr(-7).toLowerCase(),
                pathname  = filename.substr(0, filename.length - 7);
            if (extension === ".js.map") {
                compiler({
                    basedir       : sourcesDirectory,
                    filename      : pathname,
                    lockTemp      : tempDirectory,
                    lockTimeout   : 100,
                    scriptsTarget : "es5"
                }, function (errors, result) {
                    if (!errors || !errors.length) {
                        if (result) {
                            var modified = Date.parse(httpRequest.headers["if-modified-since"]),
                                date     = 1000 * parseInt(String(Number(result.date) / 1000), 10);
                            if (modified && modified === date) {
                                httpResponse.writeHead(304, httpServer.STATUS_CODES[304]);
                                httpResponse.end();
                            } else {
                                httpResponse.writeHead(200, httpServer.STATUS_CODES[200], {
                                    "Content-Type"  : "application/json; charset=utf-8",
                                    "Last-Modified" : result.date.toUTCString()
                                });
                                httpResponse.end(result.sourcemap);
                            }
                        } else {
                            next();
                        }
                    } else {
                        if (errors[0].code === "EACCES") {
                            errorHandler(403);
                        } else {
                            errorHandler(500, errors);
                        }
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

module.exports = route;