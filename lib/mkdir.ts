/// <reference path="../types/node/node.d.ts" />
/// <reference path="./deferred.ts" />
/// <reference path="./Exception.ts" />

import fs = require("fs");
import path = require("path");
import deferred = require("./deferred");
import Exception = require("./Exception");

function mkdir(directory:string, callback:(error?:Error) => void):void {
    deferred([
        (next:() => void):void => {
            fs.mkdir(directory, (error?:Error):void => {
                if (!error || Exception.getCode(error) === "EEXIST") {
                    callback(null);
                } else if (Exception.getCode(error) === "ENOENT") {
                    next();
                } else {
                    callback(error);
                }
            });
        },
        (next:() => void):void => {
            mkdir(path.dirname(directory), (error?:Error):void => {
                if (error) {
                    callback(error);
                } else {
                    next();
                }
            });
        },
        ():void => {
            fs.mkdir(directory, (error?:Error):void => {
                callback(error || null);
            });
        }
    ]);
}

export = mkdir;