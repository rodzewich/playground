/*jslint */
/*global module */

var fs   = require("fs"),
    path   = require("path"),
    colors = require('colors'),
    readline = require('readline'),
    deferred   = require("./deferred");

function configure(options, callback) {
    var cwd = options.cwd,
        parent = path.join(cwd, ".."),
        projects = [],
        project;
    function askProjectNumber(next) {
        var rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        rl.question("Select number of project: ".bold, function(answer) {
            rl.close();
            if (!projects[answer]) {
                console.log("ERROR !!!".red);
                askProjectNumber(next);
            } else {
                project = projects[answer];
                next();
            }
        });
    }
    deferred([
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
                project: path.join(parent, project)
            });
        }
    ]);
}

module.exports = configure;
