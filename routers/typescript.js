/*jslint */
/*global require, module */

var fs       = require("fs"),
    events   = require("events"),
    path   = require("path"),
    deferred = require("../lib/deferred"),
    compiler = require("../lib/typescript/compiler");

function route(options, next) {
    "use strict";

    var root     = options.root,
        temp     = options.temp,
        content  = options.content,
        request  = options.request,
        response = options.response,
        filename = options.filename,
        error    = options.error,
        http     = options.http;

    var date = null;
    var loader = null;
    var lock = null;

    deferred([

        /*function (next) {
            if (filename === "/loader.js") {
                if (loader) {
                    response.writeHead(200, http.STATUS_CODES[200], {
                        "Content-Type"  : "application/javascript; charset=utf-8"
                        //"Last-Modified" : result.date.toUTCString()
                    });
                    response.end(loader);
                } else if (lock) {
                    lock.addListener("complete", function () {
                        response.writeHead(200, http.STATUS_CODES[200], {
                            "Content-Type"  : "application/javascript; charset=utf-8"
                            //"Last-Modified" : result.date.toUTCString()
                        });
                        response.end(loader);
                    });
                } else {
                    lock = new events.EventEmitter();
                    fs.readFile(path.resolve(__dirname, "../lib/typescript/loader.js"), function (error, content) {
                        if (!error) {
                            loader = content.toString("utf8");
                            response.writeHead(200, http.STATUS_CODES[200], {
                                "Content-Type"  : "application/javascript; charset=utf-8"
                                //"Last-Modified" : result.date.toUTCString()
                            });
                            response.end(loader);
                            lock.emit("complete");
                            lock = null;
                        }
                    });
                }
            } else {
                next();
            }
        },*/

        function (next) {
            var extension = filename.substr(-3).toLowerCase(),
                pathname  = filename.substr(0, filename.length - 3);
            if (extension === ".js") {
                compiler({
                    temp     : temp,
                    basedir  : content,
                    filename : pathname
                }, function (errors, result) {
                    if (!errors || !errors.length) {
                        if (result) {
                            var modified = Date.parse(request.headers["if-modified-since"]),
                                date     = 1000 * parseInt(String(Number(result.date) / 1000), 10);
                            if (modified && modified === date) {
                                response.writeHead(304, http.STATUS_CODES[304]);
                                response.end();
                            } else {
                                response.writeHead(200, http.STATUS_CODES[200], {
                                    "Content-Type"  : "application/javascript; charset=utf-8",
                                    "X-SourceMap"   : pathname + ".js.map",
                                    "Last-Modified" : result.date.toUTCString()
                                });
                                response.end(result.javascript);
                            }
                        } else {
                            next();
                        }
                    } else {
                        if (errors[0].code === "EACCES") {
                            error(403);
                        } else {
                            error(500, errors);
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
                    temp     : temp,
                    basedir  : content,
                    filename : pathname
                }, function (errors, result) {
                    if (!errors || !errors.length) {
                        if (result) {
                            var modified = Date.parse(request.headers["if-modified-since"]),
                                date     = 1000 * parseInt(String(Number(result.date) / 1000), 10);
                            if (modified && modified === date) {
                                response.writeHead(304, http.STATUS_CODES[304]);
                                response.end();
                            } else {
                                response.writeHead(200, http.STATUS_CODES[200], {
                                    "Content-Type"  : "text/plain; charset=utf-8",
                                    "Last-Modified" : result.date.toUTCString()
                                });
                                response.end(result.typescript);
                            }
                        } else {
                            next();
                        }
                    } else {
                        if (errors[0].code === "EACCES") {
                            error(403);
                        } else {
                            error(500, errors);
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
                    temp     : temp,
                    basedir  : content,
                    filename : pathname
                }, function (errors, result) {
                    if (!errors || !errors.length) {
                        if (result) {
                            var modified = Date.parse(request.headers["if-modified-since"]),
                                date     = 1000 * parseInt(String(Number(result.date) / 1000), 10);
                            if (modified && modified === date) {
                                response.writeHead(304, http.STATUS_CODES[304]);
                                response.end();
                            } else {
                                response.writeHead(200, http.STATUS_CODES[200], {
                                    "Content-Type"  : "application/json; charset=utf-8",
                                    "Last-Modified" : result.date.toUTCString()
                                });
                                response.end(result.sourcemap);
                            }
                        } else {
                            next();
                        }
                    } else {
                        if (errors[0].code === "EACCES") {
                            error(403);
                        } else {
                            error(500, errors);
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