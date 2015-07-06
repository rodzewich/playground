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
    configure = require("./lib/configure");

var staticExists = require("./lib/staticExists"),
    staticContent = require("./lib/staticContent");

deferred([
    function (next) {
        configure({cwd: cwd}, function (error, result) {
            if (!error) {
                project = result.project;
                next();
            } else {
                console.log(error);
            }
        });
    },
    function () {

        var publicDirectory = path.join(project, "public"),
            xlibDirectory = path.join(project, "xlib");

        http.createServer(function (request, response) {


            var address  = request.url;
            var options  = url.parse(address, true) || {};
            var method   = request.method || "GET";
            var query    = options.query || {};
            var pathname = options.pathname || "/";
            var dirname  = path.dirname(options.pathname);
            var extname  = path.extname(pathname).toLowerCase();
            var extensionWithoutDot = extname.substring(1);
            var basename = path.basename(pathname, extname);


            staticExists({
                basedir      : publicDirectory,
                filename     : pathname,
                useDebugger  : true,
                useCache     : false,
                useOnlyCache : false
            }, function (exists) {
                console.log("file exists:", exists);
            });


            console.log(String(method).magenta + " " + String(address).gray);
            if (Object.keys(query).length !== 0) {
                console.log("query".green + ": ".gray + JSON.stringify(query, true, 2).gray);
            }

            function displayError404() {
                response.writeHead(404, {"Content-Type": "text/html"});
                response.end("<!DOCTYPE html>\n<html><head><title>404 Not Found</title></head><body bgcolor=\"white\"><center><h1>404 Not Found</h1></center><hr /><center>phantom</center></body></html>");
            }

            function displayError500 (message) {
                response.writeHead(500, {"Content-Type": "text/html"});
                response.end("<!DOCTYPE html>\n<html><head><title>500 Internal Server Error</title></head><body bgcolor=\"white\"><center><h1>404 Not Found</h1></center><hr /><center>phantom</center></body></html>");
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
                                displayError500();
                            } else {
                                try {
                                    references = ts.preProcessFile(content.toString("utf8"), false).referencedFiles.map(function (item) {
                                        return path.resolve(dirname, path.join(path.dirname(item.fileName), path.basename(item.fileName, path.extname(item.fileName)) + ".js"));
                                    });
                                    callback();
                                } catch (e) {
                                    displayError500();
                                }
                            }
                        });
                    },
                    function (callback) {

                    },
                    function () {
                        var content = [];
                        if (!sourceExists) {
                            displayError404();
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

            function displayImage() {

            }

            if (!!types.images[extensionWithoutDot]) {

            }


            if (method === "GET" && extname === "") {
                response.writeHead(200, {"Content-Type": "text/html"});
                response.end("<!DOCTYPE html>\n<html><head><title></title><script src=\"/app.js\"></script><script>xlib.app.onReady(function(){xlib.app.start();});</script></head><body></body></html>");
            } else if (method === "GET" && extname === ".js") {
                /*displayTypeScript();*/
            } else {
                displayError404();
            }

        }).listen(1337, '127.0.0.1');

    }
]);
