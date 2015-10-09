import typeOf = require("./typeOf");

function isNull(value:any):boolean {
    return typeOf(value) === "number";
}

export = isNull;
