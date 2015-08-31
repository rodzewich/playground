/// <reference path="./isFalse.ts" />

import isFalse = require("./isFalse");

function isTrue(value:any):boolean {
    return !isFalse(value);
}

export = isTrue;