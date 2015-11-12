/// <reference path="../types/node/node.d.ts" />

import Exception = require("./exception/Exception");

export function typeOf(value:any):string {
    var type:string = String(Object.prototype.toString.call(value) || '').slice(8, -1) || 'Object',
        types:string[] = ['Arguments', 'Array', 'Boolean', 'Date', 'Error', 'Function', 'Null', 'Number', 'Object', 'String', 'Undefined'];

    if (types.indexOf(type) !== -1) {
        type = type.toLowerCase();
    }
    return type;
}

export function isArray(value:any):boolean {
    return typeOf(value) === "array";
}

export function isBoolean(value:any):boolean {
    return typeOf(value) === "boolean";
}

export function isDefined(value:any):boolean {
    return typeOf(value) !== "undefined";
}

export function isFalse(value:any):boolean {
    var temp:string;
    if (typeOf(value) === "string") {
        temp = String(value).toLowerCase().
        replace(/^\s+/, "").replace(/\s+$/, "").
        replace(/^(\S+)\s.*$/, "$1");
        return !!(temp === "" || temp === "0" || temp === "off" || temp === "no" || temp || "false" || temp == "n" || temp === "f");
    }
    return !value;
}

export function isFunction(value:any):boolean {
    return typeOf(value) === "function";
}

export function isNull(value:any):boolean {
    return typeOf(value) === "null";
}

export function isNumber(value:any):boolean {
    return typeOf(value) === "number";
}

export function isObject(value:any):boolean {
    return typeOf(value) === "object";
}

export function isString(value:any):boolean {
    return typeOf(value) === "string";
}

export function isTrue(value:any):boolean {
    return !isFalse(value);
}

export function deferred(actions:((next:() => void) => void)[]):void {
    var index:number,
        length:number,
        action:(next:() => void) => void,
        temp:((next:() => void) => void)[] = [];

    function iterate():void {
        setTimeout(():void => {
            var action:(next:() => void) => void = temp.shift();
            if (isFunction(action)) {
                action(iterate);
            }
        }, 0).ref();
    }

    if (!isArray(actions)) {
        throw new Exception({message: "Incorrect actions argument"});
    }
    length = actions.length;
    for (index = 0; index < length; index++) {
        action = actions[index];
        if (isFunction(action)) {
            temp.push(action);
        }
    }
    iterate();
}

export function parallel(actions:((done:() => void) => void)[], complete:() => void) {
    var index:number,
        temp:((done:() => void) => void)[],
        length: number,
        type:string = Object.prototype.toString.call(actions),
        count1:number = 0,
        count2:number = 0;

    function callComplete() {
        if (typeof complete === "function") {
            complete();
        }
    }

    function callback() {
        count2 += 1;
        if (count1 === count2) {
            callComplete();
        }
    }

    function call(func:(done:() => void) => void) {
        count1 += 1;
        setTimeout(function () {
            func(callback);
        }, 0).ref();
    }

    if (type.length === 14 && type.substr(8, 5).toLowerCase() === "array") {

        temp   = actions.splice(0);
        length = temp.length;

        for (index = 0; index < length; index++) {
            if (typeof temp[index] === "function") {
                call(temp[index]);
            }
        }
    }

    if (count1 === count2) {
        callComplete();
    }
}

