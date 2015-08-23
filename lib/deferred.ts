/// <reference path="../types/node/node.d.ts" />
/// <reference path="./typeOf.ts" />
/// <reference path="./Exception.ts" />

import typeOf = require("./typeOf");
import Exception = require("./Exception");

function deferred(actions:((next:() => void) => void)[]):void {
    var index:number,
        length:number,
        action:(next:() => void) => void,
        temp:((next:() => void) => void)[] = [];

    function iterate():void {
        setTimeout(():void => {
            var action:(next:() => void) => void = temp.shift();
            if (typeOf(action) === "function") {
                action(iterate);
            }
        }, 0).ref();
    }

    if (typeOf(actions) !== "array") {
        throw new Exception("bla bla bla");
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
