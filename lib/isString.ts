import typeOf = require("./typeOf");

function isString(value:any):boolean {
    return typeOf(value) === "string";
}

export = isString;
