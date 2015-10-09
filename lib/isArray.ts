import typeOf = require("./typeOf");

function isArray(value:any):boolean {
    return typeOf(value) === "array";
}

export = isArray;
