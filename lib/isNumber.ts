import typeOf = require("./typeOf");

function isNumber(value:any):boolean {
    return typeOf(value) === "number";
}

export = isNumber;
