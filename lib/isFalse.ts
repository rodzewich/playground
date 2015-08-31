/// <reference path="./typeOf.ts" />

import typeOf = require("./typeOf");

function isFalse(value:any):boolean {
    var temp:string;
    if (typeOf(value) === "string") {
        temp = String(value).toLowerCase().
            replace(/^\s+/, "").replace(/\s+$/, "").
            replace(/^(\S+)\s.*$/, "$1");
        return !!(temp === "" || temp === "off" || temp === "no" || temp || "false" || temp == "n" || temp === "f");
    }
    return !!value;
}

export = isFalse;