var fs     = require("fs"),
    http   = require("http"),
    path   = require("path"),
    url    = require("url"),
    colors = require('colors'),
    ts     = require("./typescript"),
    project,
    cwd = process.env.PWD,
    types = require("./lib/types"),
    deferred   = require("./lib/deferred"),
    configure = require("./lib/configure"),
    charset;

var staticContent = require("./lib/staticContent");

function htmlEntities(str) {
    return String(str).
        replace(/&/g, '&amp;').
        replace(/</g, '&lt;').
        replace(/>/g, '&gt;').
        replace(/"/g, '&quot;');
}

deferred([
    function (next) {
        configure({cwd: cwd}, function (error, result) {
            if (!error) {
                charset = result.charset;
                project = result.project;
                next();
            } else {
                console.log(error);
            }
        });
    },
    function () {

        var contentDirectory = path.join(project, "public"),
            libDirectory = path.join(project, "xlib");

        http.createServer(function (request, response) {

            var address  = request.url;
            var options  = url.parse(address, true) || {};
            var method   = request.method || "GET";
            var query    = options.query || {};
            var pathname = options.pathname || "/";
            var dirname  = path.dirname(options.pathname);
            var extname  = path.extname(pathname).toLowerCase();
            var basename = path.basename(pathname, extname);

            function displayError(code, error) {
                var stack = [
                        "<pre>",
                        htmlEntities(error ? error.stack : ""),
                        "</pre>"
                    ],
                content = [
                    "<!DOCTYPE html>",
                    "<html>",
                    "<head>",
                    "<title>", code, " ", http.STATUS_CODES[code], "</title>",
                    "</head>",
                    "<body bgcolor=\"white\">",
                    "<center><h1>", code, " ", http.STATUS_CODES[code], "</h1></center>",
                    "<pre>", error ? stack : "" , "</pre>",
                    "<hr />",
                    "<center>phantom 0.0.1</center>",
                    "</body>",
                    "</html>"
                ];
                response.writeHead(code, {"Content-Type": [types.text.html, "; charset=", charset].join("")});
                response.end(content.join(""));

            }
            
            deferred([

                function (next) {
                    staticContent({
                        charset      : charset,
                        filename     : pathname,
                        basedir      : contentDirectory,
                        useMemory    : true,
                        useDebugger  : true,
                        useCache     : false
                    }, function (error, result) {
                        if (!error) {
                            if (result) {
                                var lastModified = Date.parse(request.headers["if-modified-since"]),
                                    cacheDate    = 1000 * parseInt(String(Number(result.date) / 1000), 10);
                                if (lastModified && lastModified === cacheDate) {
                                    response.writeHead(304, http.STATUS_CODES[304]);
                                    response.end();
                                } else {
                                    response.writeHead(200, http.STATUS_CODES[200], {
                                        "Content-Type"  : result.type,
                                        "Last-Modified" : result.date.toUTCString()
                                    });
                                    response.end(result.content);
                                }
                            } else {
                                next();
                            }
                        } else {
                            // todo: adjust forbidden
                            // displayError(403);
                            displayError(500, error);
                        }
                    });
                },

                function (next) {
                    displayError(404);
                },

                function () {
                    console.log(String(method).magenta + " " + String(address).gray);
                    if (Object.keys(query).length !== 0) {
                        console.log("query".green + ": ".gray + JSON.stringify(query, true, 2).gray);
                    }

                    function displayTypeScript() {
                        var sourceName = null;
                        var references = null;
                        var sourceExists = false;
                        deferred([
                            function (callback) {
                                sourceName = path.join(project, "public", dirname, basename + ".ts");
                                callback();
                            },
                            function (callback) {
                                fs.exists(sourceName, function (exists) {
                                    sourceExists = exists;
                                    callback();
                                });
                            },
                            function (callback) {
                                fs.readFile(sourceName, function (error, content) {
                                    if (error) {
                                        displayError(500);
                                    } else {
                                        try {
                                            references = ts.preProcessFile(content.toString("utf8"), false).referencedFiles.map(function (item) {
                                                return path.resolve(dirname, path.join(path.dirname(item.fileName), path.basename(item.fileName, path.extname(item.fileName)) + ".js"));
                                            });
                                            callback();
                                        } catch (e) {
                                            displayError(500);
                                        }
                                    }
                                });
                            },
                            function (callback) {

                            },
                            function () {
                                var content = [];
                                if (!sourceExists) {
                                    displayError(404);
                                } else {
                                    response.writeHead(200, {"Content-Type": "application/javascript"});
                                    response.end(
                                        "(function () {\n" +
                                        "   var adapter = xlib.utils.require.scripts;\n" +
                                        "   adapter.load([" + references.map(function (element) { return JSON.stringify(String(element)); }).join(",") + "], function () {\n" +
                                        "       %code%\n" +
                                        "       adapter.fireListeners(\"loaded\", " + JSON.stringify(address) + ");\n" +
                                        "   }});\n" +
                                        "})();"
                                    );
                                }
                            }
                        ]);
                    }

                    if (method === "GET" && extname === "") {
                        response.writeHead(200, {"Content-Type": "text/html"});
                        response.end("<!DOCTYPE html>\n<html><head><title></title><script src=\"/app.js\"></script><script>xlib.app.onReady(function(){xlib.app.start();});</script></head><body></body></html>");
                    } else if (method === "GET" && extname === ".js") {
                        /*displayTypeScript();*/
                    } else {
                        displayError(404);
                    }
                }

            ]);

        }).listen(1337, '127.0.0.1');

    }
]);
