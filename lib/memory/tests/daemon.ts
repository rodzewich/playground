/// <reference path="../../../types/node/node.d.ts" />

import path = require("path");
import assert = require("assert");
import Exception = require("../../exception/Exception");
import deferred = require("../../deferred");
import Daemon = require("../daemon/Daemon");
import IDaemon = require("../daemon/IDaemon");

function run(debug:boolean, callback:() => void):void {
    deferred([
        (next:() => void):void => {
            var location:string = path.join(__dirname, "daemon.sock"),
                daemon:IDaemon = new Daemon({location : location});
            deferred([
                (next:() => void):void => {
                    daemon.start(():void => {
                        console.log("server started");
                    });
                },
                ():void => {
                    next();
                }
            ]);
        },
        (next:() => void):void => {

        },
        (next:() => void):void => {

        },
        (next:() => void):void => {

        },
        (next:() => void):void => {

        },
        (next:() => void):void => {

        },
        callback
    ]);
}

export = run;
