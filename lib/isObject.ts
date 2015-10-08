import typeOf = require("./typeOf");

function isObject(value:any):boolean {
    return typeOf(value) === "object";
}

export = isObject;
