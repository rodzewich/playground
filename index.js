/*jslint */
/*global require */

var fs                   = require("fs"),
    http                 = require("http"),
    path                 = require("path"),
    url                  = require("url"),
    colors               = require('colors'),
    ts                   = require("./typescript"),
    project,
    cwd                  = process.env.PWD,
    types                = require("./lib/types"),
    lock                 = require("./lib/lock"),
    deferred             = require("./lib/deferred"),
    parallel             = require("./lib/parallel"),
    configure            = require("./lib/configure"),
    processingTypescript = false,
    processingLess       = true,
    processingStylus     = false,
    processingSoy        = false,
    spawn                = require("child_process").spawn,
    charset;

require('source-map-support').install({
    retrieveSourceMap : function (source) {
        if (fs.existsSync(source + ".map")) {
            return {
                url : source,
                map : fs.readFileSync(source + ".map", 'utf8')
            };
        }
        return null;
    }
});

var routers = {
        /*typescript : require("./routers/typescript"),*/
        /*stylus     : require("./routers/stylus"),*/
        less       : require("./routers/less"),
        /*soy        : require("./routers/soy")*/
    },
    initialization = {
        memory : require("./lib/memory/initialization")
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
    var temp = path.join(project, "temp");
    deferred([
        function (next) {
            var rm = spawn("rm", ["-rf", temp], {});
            rm.on('close', function (code) {
                console.log('remove temp with code: ' + code);
                next();
            });
        },
        function () {
            fs.mkdir(temp, function () {
                console.log('create temp');
                callback();
            });
        }
    ]);
}


charset = "utf-8";
//project = "../Class";
project = "../playground";

var temporaryDirectory = "/home/rodzewich/Projects/playground/temp";
var memorySocketAddress = path.join(temporaryDirectory, "memory.sock");






var Manager = require("./lib/less/manager/Manager");
var manager = new Manager({
    location: path.join(__dirname, "temp/less.sock"),
    memoryLocation: memorySocketAddress,
    sourcesDirectory: path.join(__dirname, "styles"),
    numberOfProcesses: 4
});

deferred([
    cleanTemp,
    function (done) {
        initialization.memory(memorySocketAddress, function (error) {
            if (!error) {
                console.log("memory created");
                done();
            }
        });
    },
    function (done) {
        manager.connect(function (errors) {
            if (errors && errors.length) {
                errors.map(function (error) {
                    console.log("error", error);
                });
            }
            console.log("connected!!!");
            done();
        });
    },
    function () {
        manager.compile("index", function (errors, result) {
            console.log("compiled");
            console.log(">>> result", result);
        });
    }
]);

return;











function initTypescript(callback) {
    if (processingTypescript) {
        routers.typescript.init({
            numberOfProcesses  : 4,
            sourcesDirectory   : "/home/rodzewich/Projects/playground",
            temporaryDirectory : temporaryDirectory,
            memorySocketLocation: memorySocketAddress,
            scriptsTarget      : "es5",
            useCache           : false
        }, function (errors) {
            // todo: обрабатывать ошибки
            if (errors && errors.length) {
                errors.forEach(function (error) {
                    console.log(error);
                });
            }
            console.log("Typescript sockets created!");
            callback();
        });
    } else {
        callback();
    }
}

function initLess(callback) {
    if (processingLess) {
        routers.less.init({
            numberOfProcesses    : 4,
            sourcesDirectory     : "/home/rodzewich/Projects/playground/styles",
            importDirectories    : ["/home/rodzewich/Projects/playground/less_include_dir"],
            temporaryDirectory   : temporaryDirectory,
            memorySocketLocation : memorySocketAddress,
            useCache             : false
        }, function (errors) {
            // todo: обрабатывать ошибки
            if (errors && errors.length) {
                errors.forEach(function (error) {
                    console.log(error);
                });
            }
            console.log("Less sockets created!");
            callback();
        });
    } else {
        callback();
    }
}

function initSoy(callback) {
    if (processingSoy) {
        routers.soy.init({
            numberOfProcesses    : 4,
            sourcesDirectory     : "/home/rodzewich/Projects/playground/views",
            temporaryDirectory   : temporaryDirectory,
            memorySocketLocation : memorySocketAddress,
            useCache             : false
        }, function (errors) {
            // todo: обрабатывать ошибки
            if (errors && errors.length) {
                errors.forEach(function (error) {
                    console.log(error);
                });
            } else {
                console.log("Soy inited!");
                callback();
            }
        });
    } else {
        callback();
    }
}


deferred([

    cleanTemp,

    function (next) {
        parallel([
                function (done) {
                    initialization.memory(memorySocketAddress, function (error) {
                        // todo: обрабатывать ошибки
                        if (!error) {
                            done();
                        }
                    });
                },
                /*initTypescript,*/
                initLess,
                /*initSoy*/
            ],
            function () {
                next();
            });
    },

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
    function () {

        var contentDirectory = path.join(__dirname, "."),
            tempDirectory = path.join(__dirname, "temp"),
            libDirectory = path.join(__dirname, "xlib");

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
                    list = "<ol><li>" + errors.map(function (error) {
                        return [
                            "<h3 style=\"color: red;\">", htmlEntities(error.message), "</h3>",
                            "<pre>",
                            htmlEntities(error.stack),
                            "</pre>"
                        ].join("");
                    }).join("</li><li>") + "</li></ol>";
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

                // processing *.ts files
                function (next) {
                    if (processingTypescript) {
                        routers.typescript.route({
                            rootDirectory    : "",
                            tempDirectory    : tempDirectory,
                            sourcesDirectory : contentDirectory, // todo: ???
                            httpRequest      : request,
                            httpResponse     : response,
                            errorHandler     : displayError,
                            httpServer       : http
                        }, next);
                    } else {
                        next();
                    }
                },

                // processing *.less files
                function (next) {
                    if (processingLess) {
                        routers.less.route({
                            rootDirectory : "/",
                            httpRequest   : request,
                            httpResponse  : response,
                            httpServer    : http
                        }, next);
                    } else {
                        next();
                    }
                },

                // processing *.styl files
                function (next) {
                    if (processingStylus) {
                        routers.stylus.route({
                            rootDirectory : "/",
                            httpRequest   : request,
                            httpResponse  : response,
                            httpServer    : http
                        }, next);
                    } else {
                        next();
                    }
                },

                // processing *.less files
                function (next) {
                    if (processingSoy) {
                        routers.soy.route({
                            rootDirectory : "/",
                            httpRequest   : request,
                            httpResponse  : response,
                            httpServer    : http
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
