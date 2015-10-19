/// <reference path="../../../types/node/node.d.ts" />

import assert = require("assert");
import Exception = require("../../exception/Exception");
import displayException = require("../../displayException");
import deferred = require("../../deferred");
import Daemon = require("../daemon/Daemon");
import IDaemon = require("../daemon/IDaemon");

require("../../mapping");

process.addListener('uncaughtException', function (error:Error) {
    displayException(Exception.convertFromError(error));
});

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
    (next:() => void):void => {

    },
]);

