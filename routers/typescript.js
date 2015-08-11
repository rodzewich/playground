/*jslint */
/*global require, module */

var fs            = require("fs"),
    url           = require("url"),
    events        = require("events"),
    path          = require("path"),
    typeOf        = require("../lib/typeOf"),
    deferred      = require("../lib/deferred"),
    //compiler      = require("../lib/typescript/compiler"),
    WorkerManager = require("../lib/typescript/WorkerManager"),
    manager;

var glob = require("glob");
var loaderContent    = null;

// todo: использовать tslint https://github.com/palantir/tslint

function init(options, callback) {
    "use strict";

    var temporaryDirectory = path.join(options.temporaryDirectory, "typescript");
    var sourcesDirectory = String(options.sourcesDirectory);
    // todo: check is absolute

    deferred([

        function (next) {
            // todo: рекурсивно создавать директорию
            fs.mkdir(temporaryDirectory, function () {
                next();
            });
        },

        function (next) {
            console.log("start glob");
            glob("**/*.ts", {cwd: path.join(sourcesDirectory, "utils/module")}, function (error, files) {
                loaderContent = files.join("\n");
                console.log(path.join(sourcesDirectory, "utils/module"));
                console.log("loaderContent", files);
                next();
            });
        },

        function () {
            manager = new WorkerManager({
                numberOfProcesses  : options.numberOfProcesses,
                temporaryDirectory : temporaryDirectory,
                sourcesDirectory   : sourcesDirectory,
                memorySocketLocation: options.memorySocketLocation,
                scriptsTarget      : options.scriptsTarget,
                useCache           : options.useCache
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

    var rootDirectory    = path.join("/", options.rootDirectory || ""),
        //tempDirectory    = options.tempDirectory,
        //sourcesDirectory = options.sourcesDirectory,
        httpServer       = options.httpServer,
        httpRequest      = options.httpRequest,
        httpResponse     = options.httpResponse,
        request          = url.parse(httpRequest.url, true) || {},
        filename         = path.relative(rootDirectory, String(request.pathname || "/")),
        //loaderDate       = null,
        loaderLock       = null;

    deferred([

        // todo: use simple content module
        function (next) {
            if (filename === "loader.js") {
                if (loaderContent) {
                    console.log("show loader");
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
                            loaderLock    = null;
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
                manager.compile(pathname, function (result) {
                    console.log("manager.compile(%s)", pathname);
                    console.log("filename", filename);
                    if (result) {
                        var modified = Date.parse(httpRequest.headers["if-modified-since"]),
                            date     = 1000 * result.date;
                        if (modified && modified === date) {
                            httpResponse.writeHead(304, httpServer.STATUS_CODES[304]);
                            httpResponse.end();
                        } else {
                            httpResponse.writeHead(200, httpServer.STATUS_CODES[200], {
                                "Content-Type"  : "application/javascript; charset=utf-8",
                                "X-SourceMap"   : path.join(rootDirectory, pathname + ".js.map"),
                                "Last-Modified" : (new Date(result.date * 1000)).toUTCString()
                            });
                            httpResponse.end(result.javascript);
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
            var extension = filename.substr(-3).toLowerCase(),
                pathname  = filename.substr(0, filename.length - 3);
            if (extension === ".ts") {
                manager.compile(pathname, function (result) {
                    console.log("manager.compile(%s)", pathname);
                    console.log("filename", filename);
                    if (result) {
                        var modified = Date.parse(httpRequest.headers["if-modified-since"]),
                            date     = 1000 * result.date;
                        if (modified && modified === date) {
                            httpResponse.writeHead(304, httpServer.STATUS_CODES[304]);
                            httpResponse.end();
                        } else {
                            httpResponse.writeHead(200, httpServer.STATUS_CODES[200], {
                                "Content-Type"  : "text/plain; charset=utf-8",
                                "Last-Modified" : (new Date(result.date * 1000)).toUTCString()
                            });
                            httpResponse.end(result.typescript);
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
            var extension = filename.substr(-7).toLowerCase(),
                pathname  = filename.substr(0, filename.length - 7);
            if (extension === ".js.map") {
                manager.compile(pathname, function (result) {
                    console.log("manager.compile(%s)", pathname);
                    console.log("filename", filename);
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
                            httpResponse.end(result.sourcemap);
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