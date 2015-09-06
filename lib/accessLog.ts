/// <reference path="../types/node/node.d.ts" />
/// <reference path="../types/colors/colors.d.ts" />

import colors = require("colors");
import http = require("http");

function accessLog(method:string, filename:string, code:number, type?:string):void {
    var pathname:string,
        time:Date = new Date(),
        hours:string = ("00" + String(time.getHours())).slice(-2),
        minutes:string = ("00" + String(time.getMinutes())).slice(-2),
        seconds:string = [("00" + String(time.getSeconds())).slice(-2), String(Number(time)).slice(-3)].join(".");
    if (code >= 300 && code < 400) {
        pathname = colors.gray(filename);
    } else if (code >= 400 && code < 600) {
        pathname = colors.red(filename);
    } else {
        pathname = colors.green(filename);
    }
    console.log([
        colors.gray("[" + [hours, minutes, seconds].join(":") + "]"),
        colors.magenta(method), pathname,
        colors.cyan([String(code), http.STATUS_CODES[code]].join(" ")),
        type ? colors.gray("(" + type + ")") : ""
    ].join(" "));

}

export = accessLog;