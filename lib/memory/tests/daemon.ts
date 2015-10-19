/// <reference path="../../../types/node/node.d.ts" />

import assert = require("assert");
import Exception = require("../../exception/Exception");
import deferred = require("../../deferred");
import Daemon = require("../daemon/Daemon");
import IDaemon = require("../daemon/IDaemon");

function run(debug:boolean, callback:() => void):void {
    deferred([
        (next:() => void):void => {
            var daemon:IDaemon = new Daemon();
            deferred([
                (next:() => void):void => {

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
