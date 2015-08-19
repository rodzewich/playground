/// <reference path="../types/node/node.d.ts" />
/// <reference path="./typeOf.ts" />

import typeOf = require("./typeOf");

function deferred(actions:((next:() => void) => void)[]):void {
    var index:number,
        length:number,
        action:(next:() => void) => void,
        temp:((next:() => void) => void)[] = [];

    function iterate():void {
        var timeout = setTimeout(function () {
            var action:(next:() => void) => void = temp.shift();
            if (typeOf(action) === "function") {
                action(iterate);
            }
        }, 0);
        if (typeof window === "undefined") {
            timeout.ref();
        }
    }

    if (typeOf(actions) !== "undefined") {
        throw new Error("bla bla bla");
    }
    length = actions.length;
    for (index = 0; index < length; index++) {
        action = actions[index];
        if (typeOf(action) === "function") {
            temp.push(action);
        }
    }
    iterate();
}

export = deferred;
