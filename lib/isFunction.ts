import typeOf = require("./typeOf");

function isFunction(value:any):boolean {
    return typeOf(value) === "function";
}

export = isFunction;
