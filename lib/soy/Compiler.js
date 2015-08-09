/*jslint */
/*global module, require, process, setTimeout */

var fs           = require('fs'),
    util         = require('util'),
    EventEmitter = require('events').EventEmitter,
    path         = require('path'),
    deferred     = require("../deferred"),
    parallel     = require("../parallel"),
    typeOf       = require("../typeOf"),
    less         = require("less");

var spawn = require("child_process").spawn;
//var LessError = require("./LessError");
var memory = require("../memory/WorkerClient");
var client,
    clientQueue;

function Compiler(options) {
    "use strict";

    var self = this,
        index,
        length,
        element;

    var rootDirectory = String(options.rootDirectory || "/"); // todo: check directory
    var memorySocketLocation = String(options.memorySocketLocation || ""); // todo: check directory
    var temporaryDirectory = String(options.temporaryDirectory || ""); // todo: check directory
    var sourcesDirectory = options.sourcesDirectory; // todo: check directory
    var useCache = !!options.useCache;
    var errorBackgroundColor = String(options.errorBackgroundColor || "yellow"); // todo: check color
    var errorTextColor = String(options.errorTextColor || "black"); // todo: check color
    var errorBlockPadding = String(options.errorBlockPadding || "10px"); // todo: check size
    var errorFontSize = String(options.errorFontSize || "13px"); // todo: check size

    function getMemory(callback) {
        var temp;
        if (client) {
            setTimeout(function () {
                console.log("memory in cache");
                callback(null, client);
            }, 0);
        } else {
            temp = memory({
                socket    : memorySocketLocation,
                namespace : "less"
            });
            temp.connect(function (error) {
                //client = !error ? temp : null;
                console.log("memory new");
                callback(error || null, temp);
            });
            /*if (clientQueue) {
             clientQueue.once("complete", function (error, client) {
             callback(error, client);
             });
             } else {
             clientQueue = new EventEmitter();
             temp = memory({
             socket    : memorySocketLocation,
             namespace : "less"
             });
             temp.connect(function (error) {
             client = !error ? temp : null;
             callback(error || null, client);
             clientQueue.emit("complete", error || null, client);
             clientQueue = null;
             });
             }*/
        }
    }

    function errorHandler(errors) {
        var property,
            content    = [],
            bodyBefore = {
                "margin"           : "0 !important",
                "overflow"         : "hidden !important",
                "display"          : "block !important",
                "padding"          : errorBlockPadding + " !important",
                "color"            : errorTextColor + " !important",
                "background-color" : errorBackgroundColor + " !important",
                "white-space"      : "pre !important",
                "font-family"      : "'Courier New',Courier,'Lucida Sans Typewriter','Lucida Typewriter',monospace !important",
                "font-size"        : errorFontSize + " !important",
                "font-style"       : "normal !important",
                "font-variant"     : "normal !important",
                "font-weight"      : "400 !important",
                "word-wrap"        : "break-word !important",
                "content"          : JSON.stringify(errors.map(function (error, index) {
                    return String(index + 1) + ". " + error.stack;
                }).join("\n\n")).replace(/\\n/g, "\\A ") + " !important"
            };
        for (property in bodyBefore) {
            if (!bodyBefore.hasOwnProperty(property)) {
                continue;
            }
            content.push(property + ":" + bodyBefore[property] + ";");
        }
        return "(function(){var d=document,s=d.createElement(\"style\"),t=d.createTextNode(" + JSON.stringify("body:before{" + content.join("") + "}") + ");s.appendChild(t);(d.head||d.body).appendChild(s);}());";
    }


    self.compile = function (filename, callback) {

        var resolve = path.join(sourcesDirectory, filename + ".soy"),
            temp = path.join(temporaryDirectory, filename + ".js"),
            result,
            content,
            memory,
            mtime,
            unlock;

        function done(result) {
            if (typeOf(callback) === "function") {
                callback(result);
            }
        }

        deferred([

            // memory client
            function (next) {
                getMemory(function (error, client) {
                    console.log("get memory instance");
                    if (!error) {
                        memory = client;
                        next();
                    } else {
                        done({
                            soy        : "",
                            javascript : errorHandler([error]),
                            date       : parseInt(Number(new Date()).toString(10).slice(0, -3), 10)
                        });
                    }
                });
            },

            // get keys
            function (next) {
                if (useCache) {
                    memory.getItem(filename, function (error, response) {
                        if (!error) {
                            done(response || null);
                        } else {
                            done({
                                soy        : "",
                                javascript : errorHandler([error]),
                                date       : parseInt(Number(new Date()).toString(10).slice(0, -3), 10)
                            });
                        }
                    });
                } else {
                    next();
                }
            },

            function (next) {
                fs.stat(resolve, function (error, result) {
                    console.log("fs.stat(%s) = ", resolve, error, result);
                    if (!error && result.isFile()) {
                        mtime = parseInt(Number(result.mtime).toString(10).slice(0, -3), 10);
                        next();
                    } else if (error.code !== "ENOENT") {
                        done({
                            soy        : "",
                            javascript : errorHandler([error]),
                            date       : parseInt(Number(new Date()).toString(10).slice(0, -3), 10)
                        });
                    } else {
                        done(null);
                    }
                });
            },

            function (next) {
                memory.getItem(filename, function (error, response) {
                    if (!error && response && response.date >= mtime) {
                        done(response);
                    } else if (error) {
                        done({
                            soy        : "",
                            javascript : errorHandler([error]),
                            date       : parseInt(Number(new Date()).toString(10).slice(0, -3), 10)
                        });
                    } else {
                        next();
                    }
                });
            },

            function (next) {
                console.log("memory.lock(%s)", filename);
                memory.lock(filename, function (error, result) {
                    if (!error) {
                        unlock = result;
                        next();
                    } else {
                        done({
                            soy        : "",
                            javascript : errorHandler([error]),
                            date       : parseInt(Number(new Date()).toString(10).slice(0, -3), 10)
                        });
                    }
                });
            },

            function (next) {
                console.log("fs.readFile(%s)", resolve);
                fs.readFile(resolve, function (error, buffer) {
                    if (!error) {
                        content = buffer.toString("utf8");
                        next();
                    } else {
                        done({
                            soy        : "",
                            javascript : errorHandler([error]),
                            date       : parseInt(Number(new Date()).toString(10).slice(0, -3), 10)
                        });
                    }
                });
            },

            function (next) {
                var content = [];
                var compiler = spawn("/usr/bin/env", ["java",
                    "-jar", path.join(__dirname, "closure-templates/SoyToJsSrcCompiler.jar"),
                    "--srcs", resolve,
                    "--outputPathFormat", temp,
                    "--allowExternalCalls",
                    "--codeStyle", "CONCAT", // todo: move to options
                    "--shouldGenerateJsdoc"
                ]);
                compiler.on("error", function (error) {
                    done({
                        soy        : content,
                        javascript : errorHandler([error]),
                        date       : parseInt(Number(new Date()).toString(10).slice(0, -3), 10)
                    });
                });
                compiler.on("close", function (code) {
                    if (code === 0 && !content.length) {
                        next();
                    } else {
                        done({
                            soy        : content,
                            javascript : errorHandler([new SoyError(content.join("").replace(/\t/g, "    "))]),
                            date       : parseInt(Number(new Date()).toString(10).slice(0, -3), 10)
                        });
                    }
                });
                compiler.stdout.on("data", function (data) {
                    content.push(data.toString("utf8"));
                });
                compiler.stderr.on("data", function (data) {
                    content.push(data.toString("utf8"));
                });
            },

            function (next) {
                fs.readFile(temp, function (error, buffer) {
                    if (!error) {
                        result = [
                            "(function () {",
                            "    var adapter = xlib.utils.require.scripts;",
                            "    adapter.load(null, function (exports) {",
                            buffer.toString("utf8").split("\n").map(function (line, index, array) {
                                return index !== array.length - 1 ? "        " + line : ""
                            }).join("\n"),
                            "        adapter.fireListeners(\"loaded\", {",
                            "            module     : __module,",
                            "            references : __references,",
                            "            dirname    : __dirname,",
                            "            filename   : __filename,",
                            "            exports    : exports",
                            "        });",
                            "    });",
                            "}());"
                        ].join("\n");
                        next();
                    } else {
                        done({
                            soy        : content,
                            javascript : errorHandler([error]),
                            date       : parseInt(Number(new Date()).toString(10).slice(0, -3), 10)
                        });
                    }
                });
            },

            function () {
                var value = {
                    soy: content,
                    javascript: result,
                    date : parseInt(Number(new Date()).toString(10).slice(0, -3), 10)
                };
                memory.setItem(filename, value, function (error) {
                    if (!error) {
                        done(value);
                    } else {
                        done({
                            soy        : content,
                            javascript : errorHandler([error]),
                            date       : parseInt(Number(new Date()).toString(10).slice(0, -3), 10)
                        });
                    }
                });
            }


        ]);

    };

}

util.inherits(Compiler, EventEmitter);

module.exports = Compiler;

function SoyError (stack) {

    this.name = "SoyError";

    this.__defineGetter__('stack', function () {
        return this.name + ": " + stack;
    });
}

util.inherits(SoyError, Error);

