/// <reference path="../types/node/node.d.ts" />
/// <reference path="../types/colors/colors.d.ts" />

import colors = require("colors");
import http = require("http");

function accessLog(method:string, filename:string, code:number, time?:number, type?:string, clientHeaders?: any, serverHeaders?: any):void {
    var pathname:string,
        date:Date = new Date(),
        hours:string = ("00" + String(date.getHours())).slice(-2),
        minutes:string = ("00" + String(date.getMinutes())).slice(-2),
        seconds:string = [("00" + String(date.getSeconds())).slice(-2), String(Number(date)).slice(-3)].join("."),
        message:string[] = [];
    if (code >= 300 && code < 400) {
        pathname = colors.gray(filename);
    } else if (code >= 400 && code < 600) {
        pathname = colors.red(filename);
    } else {
        pathname = colors.green(filename);
    }
    message.push(colors.gray("[" + [hours, minutes, seconds].join(":") + "]"));
    message.push(colors.magenta(method));
    message.push(pathname);
    if (time) {
        message.push(colors.gray("(" + String(time) + "ms)"));
    }
    message.push(colors.cyan(String(code)));
    if (http.STATUS_CODES[code]) {
        message.push(colors.cyan(http.STATUS_CODES[code]));
    }
    if (type) {
        message.push(colors.gray("(" + type + ")"));
    }
    console.log(message.join(" "));
    /*if (clientHeaders) {
        console.log(colors.bold("CLIENT HEADERS:"));
        var property: string;
        for (property in clientHeaders) {
            console.log(property, ":", clientHeaders[property]);
        }
    }
    if (serverHeaders) {
        console.log(colors.bold("SERVER HEADERS:"));
        var property: string;
        for (property in serverHeaders) {
            console.log(property, ":", serverHeaders[property]);
        }
    }*/
}

export = accessLog;