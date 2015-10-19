/// <reference path="./types/glob/glob.d.ts" />

import glob      = require("glob");
import deferred  = require("./lib/deferred");
import Exception = require("./lib/exception/Exception");
import displayException = require("./lib/displayException");

require("./lib/mapping");

process.addListener('uncaughtException', function (error:Error) {
    displayException(Exception.convertFromError(error));
});

var debug:boolean = true;

glob("./lib/**/tests/*.js", (errors, files):void => {
    var actions:((next:() => void) => void)[] = [];
    files.forEach((file:string):void => {
        actions.push((next:() => void):void => {
            console.log("Running:", file);
            require(file)(debug, ():void => {
                next();
            });
        });
    });
    deferred(actions);
});

