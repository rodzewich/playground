import typeOf = require("./typeOf");

function isDefined(value:any):boolean {
    return typeOf(value) !== "undefined";
}

export = isDefined;
