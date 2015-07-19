/*jslint */
/*global require */

var fs     = require("fs"),
    http   = require("http"),
    path   = require("path"),
    url    = require("url"),
    colors = require('colors'),
    ts     = require("./typescript"),
    project,
    cwd       = process.env.PWD,
    types     = require("./lib/types"),
    lock     = require("./lib/lock"),
    deferred  = require("./lib/deferred"),
    configure = require("./lib/configure"),
    useTypescript = true,
    spawn = require("child_process").spawn,
    charset;

var routers = {
    typescript : require("./routers/typescript")
};

var staticContent = require("./lib/staticContent");

function htmlEntities(str) {
    return String(str).
        replace(/&/g, '&amp;').
        replace(/</g, '&lt;').
        replace(/>/g, '&gt;').
        replace(/"/g, '&quot;');
}

function cleanTemp(callback) {
    var temp = path.join(project, "temp"),
        rm   = spawn("rm", ["-rf", temp], {});
    rm.on('close', function (code) {
        console.log('remove temp with code: ' + code);
        callback();
    });
}


charset = "utf-8";
project = "../Class";

deferred([
    /*function (next) {
        configure({cwd: cwd}, function (error, result) {
            if (!error) {
                charset = result.charset;
                project = result.project;
                next();
            } else {
                console.log(error);
            }
        });
    },*/
    cleanTemp,
    function () {

        var contentDirectory = path.join(project, "xlib"),
            tempDirectory = path.join(project, "temp"),
            libDirectory = path.join(project, "xlib");

        http.createServer(function (request, response) {

            var address  = request.url;
            var options  = url.parse(address, true) || {};
            var method   = request.method || "GET";
            var query    = options.query || {};
            var filename = options.pathname || "/";
            var dirname  = path.dirname(filename);
            var extname  = path.extname(filename).toLowerCase();
            var basename = path.basename(filename, extname);

            function displayError(code, errors) {
                var list, content;
                if (errors && errors.length) {
                    list = "<ul><li>" + errors.map(function (error) {
                        return [
                            "<h3>", htmlEntities(error.message), "</h3>",
                            "<pre>",
                            htmlEntities(error.stack),
                            "</pre>"
                        ].join("");
                    }).join("</li><li>") + "</li></ul>";
                }
                content = [
                    "<!DOCTYPE html>",
                    "<html>",
                    "<head>",
                    "<title>", code, " ", http.STATUS_CODES[code], "</title>",
                    "</head>",
                    "<body bgcolor=\"white\">",
                    "<center><h1>", code, " ", http.STATUS_CODES[code], "</h1></center>",
                    list,
                    "<hr />",
                    "<center>phantom 0.0.1</center>",
                    "</body>",
                    "</html>"
                ];
                response.writeHead(code, {"Content-Type": [types.text.html, "; charset=", charset].join("")});
                response.end(content.join(""));

            }

            deferred([

                // typescript
                function (next) {

                    if (useTypescript) {

                        routers.typescript({
                            temp     : tempDirectory,
                            content  : contentDirectory,
                            filename : filename,
                            request  : request,
                            response : response,
                            error    : displayError,
                            http     : http
                        }, next);

                    } else {
                        next();
                    }

                },

                // static
                function (next) {
                    staticContent({
                        charset      : charset,
                        filename     : filename,
                        basedir      : contentDirectory,
                        useMemory    : true,
                        useDebugger  : true,
                        useCache     : false
                    }, function (error, result) {
                        if (!error) {
                            if (result) {
                                var modified = Date.parse(request.headers["if-modified-since"]),
                                    date     = 1000 * parseInt(String(Number(result.date) / 1000), 10);
                                if (modified && modified === date) {
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
                            if (error.code === "EACCES") {
                                displayError(403);
                            } else {
                                displayError(500, [error]);
                            }
                        }
                    });
                },

                // not found
                function () {
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
