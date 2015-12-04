/// <reference path="../../types/node/node.d.ts" />

export function typeOf(value:any):string {
    let type:string = String(Object.prototype.toString.call(value) || '').slice(8, -1) || 'Object',
        types:string[] = ['Arguments', 'Array', 'Boolean', 'Date', 'Error', 'Function', 'Null', 'Number', 'Object', 'String', 'Undefined'];

    if (types.indexOf(type) !== -1) {
        type = type.toLowerCase();
    }
    return type;
}

export function isArguments(value:any):boolean {
    return typeOf(value) === "arguments";
}

export function isError(value:any):boolean {
    return typeOf(value) === "error";
}

export function isDate(value:any):boolean {
    return typeOf(value) === "date";
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

export function isUndefined(value:any):boolean {
    return typeOf(value) === "undefined";
}

export function isFalse(value:any):boolean {
    let temp:string;
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
    let index:number,
        length:number,
        action:(next:() => void) => void,
        temp:((next:() => void) => void)[] = [];

    function iterate():void {
        let timer:NodeJS.Timer = setTimeout(():void => {
            let action:(next:() => void) => void = temp.shift();
            if (isFunction(action)) {
                action(iterate);
            }
        }, 0);
        if (isFunction(timer.ref)) {
            timer.ref();
        }
    }

    if (isArray(actions)) {
	    length = actions.length;
    	for (index = 0; index < length; index++) {
        	action = actions[index];
	        if (isFunction(action)) {
		        temp.push(action);
        	}
	    }
    	iterate();
    }
}

// todo: re-implement it
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

export function clone(object:any, recursive:boolean = false) {
    let prop:string,
        index:number,
        length:number,
        array:any[],
        result:any;
    switch (typeOf(object)) {
        case "null":
        case "undefined":
        case "number":
        case "string":
        case "boolean":
        case "function":
            return object;
        case "date":
            return new Date(Number(object));
        case "arguments":
        case "array":
            length = (<any[]>object).length;
            array = [];
            for (index = 0; index < length; index++) {
                if (recursive) {
                    array.push(clone((<any[]>object)[index]));
                } else {
                    array.push((<any[]>object)[index]);
                }
            }
            return array;
        case "error":
            return new Error((<Error>object).message);
        default:
            result = {};
            for (prop in object) {
                if (!object.hasOwnProperty(prop)) {
                    continue;
                }
                if (recursive) {
                    result[prop] = clone(object[prop]);
                } else {
                    result[prop] = object[prop];
                }
            }
            return result;
    }
}

// todo: implement it
export function merge(...objects:any[]):any {
    if (objects.length === 0) {
        return null;
    } else {
        
    }
}

export function get(object:any, key:string):any {
    let keys:string[] = String(key || "").split("."),
        length:number = keys.length,
        result:any = object,
        index:number;
    for (index = 0; index < length; index++) {
        if (/^\s*$/.test(keys[index])) {
            continue;
        }
        if (isObject(result)) {
            result = (<{[index:string]:any}>result)[keys[index].replace(/^\s*(\S+(?:.+\S+)*)\s*$/, "$1")];
            continue;
        }
        if (isArguments(result) || isArray(result)) {
            result = (<{[index:string]:any}>result)[parseInt(keys[index], 10)];
            continue;
        }
        return null;
    }
    return isDefined(result) ? result : null;
}

export function template(template:string, ...args:any[]):string {
    return String(template).replace(/(?:\{(\d+)\})/g, (substring:string, ...items:any[]):string => {
        return String(args[parseInt(<string>items[0])] || "");
    }).replace(/(?:\{([^\{\}]+)\})/g, (substring:string, ...items:any[]):string => {
        return get(args[0], <string>items[0]);
    });
}
