import typeOf = require("./typeOf");

function isNull(value:any):boolean {
    return typeOf(value) === "null";
}

export = isNull;
