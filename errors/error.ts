/// <reference path="../types/node/node.d.ts" />

import IOptions     = require("./IOptions");
import IException   = require("../lib/exception/IException");
import htmlEntities = require("../lib/htmlEntities");
import http         = require("http");

function render(code:number, options:IOptions, errors?:IException[]):string {
    var list:string,
        status:string = http.STATUS_CODES[code],
        serverName:string = options.name,
        serverVersion:string = options.version;
    if (errors && errors.length) {
        list = "<ol><li>" + errors.map((error:IException):string => {
                return [
                    "<h3 style=\"color: red;\">", htmlEntities(error.getMessage()), "</h3>",
                    "<pre>",
                    htmlEntities(error.getStack()),
                    "</pre>"
                ].join("");
            }).join("</li><li>") + "</li></ol>";
    }
    return [
        "<!DOCTYPE html>",
        "<html>",
            "<head>",
                "<title>", String(code), status ? " " + status : "", "</title>",
            "</head>",
            "<body bgcolor=\"white\">",
                "<center><h1>", String(code), status ? " " + status : "", "</h1></center>",
                list,
                "<hr />",
                "<center>", serverName, " ", serverVersion, "</center>",
            "</body>",
        "</html>"
    ].join("");
}

export = render;
