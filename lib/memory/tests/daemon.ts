/// <reference path="../../../types/node/node.d.ts" />

import path = require("path");
import assert = require("assert");
import {Exception} from "../../exception";
import {deferred} from "../../utils";
import {IDaemon, Daemon} from "../daemon";

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
