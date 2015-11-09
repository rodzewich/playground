import typeOf = require("./typeOf");

function isBoolean(value:any):boolean {
    return typeOf(value) === "boolean";
}

export = isBoolean;
