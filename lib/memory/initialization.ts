/// <reference path="../node.d.ts" />

import cp = require("child_process");
import path = require("path");

function init(location:string, callback:() => void):void {
    var command:cp.ChildProcess = cp.spawn(process.execPath, [path.join(__dirname, "daemon.js"), location]);
    command.stderr.addListener("data", function (data) {
        console.log(("Memory socket say:\n" + data.toString("utf8")));
    });
    command.stdout.addListener("data", function (data) {
        console.log(("Memory socket say:\n" + data.toString("utf8")));
    });
    setTimeout(():void => {
        console.log("created memory socket");
        callback();
    }, 300);
}

export = init;
