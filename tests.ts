/// <reference path="./types/node/node.d.ts" />
/// <reference path="./types/glob/glob.d.ts" />
/// <reference path="./types/optimist/optimist.d.ts" />

import glob       = require("glob");
import path       = require("path");
import optimist   = require("optimist");
import {isTrue, isFunction} = require("./lib/utils");
import deferred   = require("./lib/deferred");
import Exception  = require("./lib/exception/Exception");
import displayException = require("./lib/displayException");

require("./lib/mapping");

var argv:any = optimist
    .usage("Usage: tests [--debug] [--test ./path/to/test]")
    .alias("t", "test").describe("t", "Path to test\n")
    .boolean("l").alias("d", "debug").describe("d", "Debug sign")
    .boolean("h").alias("h", "help").describe("h", "Show this help")
    .argv;

if (argv.help) {
    optimist.showHelp();
    process.exit(0);
}

process.addListener('uncaughtException', function (error:Error) {
    displayException(Exception.convertFromError(error));
});

var test:Function;

if (argv.test) {
    test = require(argv.test);
    console.log("Test:", path.join(path.dirname(argv.test), path.basename(argv.test, path.extname(argv.test))));
    if (!isFunction(test)) {
        displayException(new Exception({message: "Test should be export run function"}))
    } else {
        test(isTrue(argv.debug), ():void => {});
    }
} else {
    glob("./lib/**/tests/*.js", (errors, files):void => {
        var actions:((next:() => void) => void)[] = [];
        files.forEach((file:string):void => {
            actions.push((next:() => void):void => {
                console.log("Test:", path.join(path.dirname(file), path.basename(file, path.extname(file))));
                require(file)(isTrue(argv.debug), ():void => {
                    next();
                });
            });
        });
        deferred(actions);
    });
}
