/*jslint */
/*global module */

"use strict";

var fs   = require("fs"),
    path   = require("path"),
    colors = require('colors'),
    readline = require('readline'),
    deferred   = require("./deferred");

function configure(options, callback) {
    var cwd = options.cwd,
        parent = path.join(cwd, ".."),
        useTypescript = true,
        asksCount = 0,
        projects = [],
        charset,
        lang,
        project;
    function askProjectNumber(next) {
        var defaultValue = "0",
            rl = readline.createInterface({
                input  : process.stdin,
                output : process.stdout
            });
        asksCount += 1;
        rl.question("Enter project number [" + defaultValue + "]: ", function(answer) {
            rl.close();
            answer = answer.
                replace(/^\s+/, "").
                replace(/\s+$/, "").
                replace(/\s+/g, " ") || defaultValue;
            if (!projects[answer]) {
                if (asksCount > 3) {
                    console.log("ERROR2 !!!".red);
                    callback(new Error("Bad project"), null);
                } else {
                    console.log("ERROR1 !!!".red);
                    askProjectNumber(next);
                }
            } else {
                project = projects[answer];
                next();
            }
        });
    }

    function askLang (next) {
        var defaultValue = "en_US",
            rl = readline.createInterface({
                input  : process.stdin,
                output : process.stdout
            });
        rl.question("Enter default language [" + defaultValue + "]: ", function (answer) {
            rl.close();
            answer = answer.
                replace(/^\s+/, "").
                replace(/\s+$/, "").
                replace(/\s+/g, " ") || defaultValue;
            lang = answer;
            // todo: check valid language
            next();
        });
    }

    function askCharset(next) {
        var defaultValue = "utf-8",
            rl = readline.createInterface({
            input  : process.stdin,
            output : process.stdout
        });
        rl.question("Enter default charset [" + defaultValue + "]: ", function (answer) {
            rl.close();
            answer = answer.
                replace(/^\s+/, "").
                replace(/\s+$/, "").
                replace(/\s+/g, " ") || defaultValue;
            charset = answer;
            // todo: check valid charset
            next();
        });
    }

    function askAboutUseTypescript(next) {
        var defaultValue = "yes",
            rl = readline.createInterface({
                input  : process.stdin,
                output : process.stdout
            });
        rl.question("Do you need use typescript [" + defaultValue + "]: ", function (answer) {
            rl.close();
            answer = answer.
                replace(/^\s+/, "").
                replace(/\s+$/, "").
                replace(/\s+/g, " ").toLowerCase() || defaultValue;
            useTypescript = ["y", "yes"].indexOf(answer) !== -1;
            next();
        });
    }

    deferred([
        askLang,
        askCharset,
        askAboutUseTypescript,
        function (next) {
            fs.readdir(parent, function (error, files) {
                var actions = [];
                if (!error) {
                    files.
                        filter(function (project) {
                            var symbol = project.substr(0, 1);
                            return ["~", "."].indexOf(symbol) === -1;
                        }).
                        forEach(function (project) {
                            var skip = false,
                                filename = path.join(parent, project);
                            actions.push(function (next) {
                                if (!skip) {
                                    fs.stat(filename, function (error, stats) {
                                        if (!error && stats.isDirectory()) {
                                            next();
                                        } else {
                                            skip = true;
                                            next();
                                        }
                                    });
                                } else {
                                    next();
                                }
                            });
                            actions.push(function (next) {
                                var publicDirectory = path.join(filename, "public");
                                if (!skip) {
                                    fs.stat(publicDirectory, function (error, stats) {
                                        if (!error && stats.isDirectory()) {
                                            next();
                                        } else {
                                            skip = true;
                                            next();
                                        }
                                    });
                                } else {
                                    next();
                                }
                            });
                            actions.push(function (next) {
                                var xlibDirectory = path.join(filename, "xlib");
                                if (!skip) {
                                    fs.stat(xlibDirectory, function (error, stats) {
                                        if (!error && stats.isDirectory()) {
                                            next();
                                        } else {
                                            skip = true;
                                            next();
                                        }
                                    });
                                } else {
                                    next();
                                }
                            });
                            actions.push(function (next) {
                                if (!skip) {
                                    projects.push(project);
                                }
                                next();
                            });
                        });
                    actions.push(function () {
                        projects.forEach(function (project, index) {
                            console.log(("[" + String(index) + "]").green + " " + project);
                        });
                        next();
                    });
                    deferred(actions);
                } else {
                    callback(error, null);
                }
            });
        },
        askProjectNumber,
        function () {
            callback(null, {
                lang          : lang,
                charset       : charset,
                useTypescript : useTypescript,
                project       : path.join(parent, project)
            });
        }
    ]);
}

module.exports = configure;
