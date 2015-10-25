/// <reference path="./types/glob/glob.d.ts" />
/// <reference path="./types/optimist/optimist.d.ts" />

import glob      = require("glob");
import optimist  = require("optimist");
import isTrue    = require("./lib/isTrue");
import deferred  = require("./lib/deferred");
import Exception = require("./lib/exception/Exception");
import displayException = require("./lib/displayException");

require("./lib/mapping");

var argv:any = optimist
    .usage("Usage: tests [--debug] --test ./path/to/test.js")
    .boolean("l").alias("d", "debug").describe("d", "Debug sign")
    .alias("t", "test").describe("t", "Path to test")
    .argv;

process.addListener('uncaughtException', function (error:Error) {
    displayException(Exception.convertFromError(error));
});

if (argv.test) {
    require(argv.test)(isTrue(argv.debug), ():void => {});
} else {
    glob("./lib/**/tests/*.js", (errors, files):void => {
        var actions:((next:() => void) => void)[] = [];
        files.forEach((file:string):void => {
            actions.push((next:() => void):void => {
                console.log("Running:", file);
                require(file)(isTrue(argv.debug), ():void => {
                    next();
                });
            });
        });
        deferred(actions);
    });
}
