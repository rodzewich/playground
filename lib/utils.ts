/// <reference path="../types/node/node.d.ts" />
/// <reference path="../types/colors/colors.d.ts" />
/// <reference path="../types/source-map-support/source-map-support.d.ts" />

import * as fs from "fs";
import * as path from "path";
import * as colors from "colors";
import mappingSupport = require('source-map-support');
import {IException, Exception} from "./exception";

export function typeOf(value:any):string {
    var type:string = String(Object.prototype.toString.call(value) || '').slice(8, -1) || 'Object',
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
        throw new Exception({message: "incorrect first argument, it must be a functions array"});
    }
    length = actions.length;
    for (index = 0; index < length; index++) {
        action = actions[index];
        if (!isFunction(action)) {
            throw new Exception({message: "incorrect first argument, it contains a " + typeOf(action) + " element instead function"});
        }
        temp.push(action);
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

export function mkdir(directory:string, callback?:(errors:IException[]) => void):void {

    function handler(errors:IException[]) {
        if (isFunction(callback)) {
            callback(errors);
        }
    }

    deferred([
        (next:() => void):void => {
            fs.mkdir(directory, (error:NodeJS.ErrnoException):void => {
                if (!error || error.code === "EEXIST") {
                    handler(null);
                } else if (error.code === "ENOENT") {
                    next();
                } else {
                    handler([Exception.convertFromError(error, {
                        code    : error.code,
                        errno   : error.errno,
                        path    : error.path,
                        syscall : error.syscall
                    })]);
                }
            });
        },
        (next:() => void):void => {
            mkdir(path.dirname(directory), (errors:IException[]):void => {
                if (errors && errors.length) {
                    handler(errors);
                } else {
                    next();
                }
            });
        },
        ():void => {
            fs.mkdir(directory, (error:NodeJS.ErrnoException):void => {
                if (error) {
                    handler([Exception.convertFromError(error, {
                        code    : error.code,
                        errno   : error.errno,
                        path    : error.path,
                        syscall : error.syscall
                    })]);
                } else {
                    handler(null);
                }
            });
        }
    ]);
}

export function displayException(error:IException) {
    var columns = process.stdout.columns || 80;
    function spaces(num:number) {
        return new Array(num + 1).join(" ");
    }
    console.log("");
    console.log("  " + colors.bgRed.white(spaces(columns - 4)));
    error.getStack().split("\n").forEach(function (line:string) {
        var temp:string;
        do {
            temp = line.slice(0, columns - 10);
            temp = temp + spaces(columns - temp.length - 10);
            line = line.slice(columns - 10);
            console.log("  " + colors.bgRed.white("   " + temp + "   "));
        } while (line);
    });
    console.log("  " + colors.bgRed.white(spaces(columns - 4)));
    console.log("");
}

// todo: re-implement it
export function clone(object:any, recursive:boolean = false) {
    var result = {};
    var prop;
    if (object) {
        for (prop in object) {
            if (!object.hasOwnProperty(prop)) {
                continue;
            }
            result[prop] = object[prop];
        }
    }
    return result;
}

// todo: re-implement it
export function lock(options, callback) {

    var temp     = String(options.temp || ""),
        timeout  = Math.max(0, parseInt(String(options.timeout), 10) || 0) || 100,
        filename = path.join(temp, options.filename) + ".lock",
        dirname  = path.dirname(filename),
        actions  = [],
        fd;

    function unlock() {
        deferred([
            function (next) {
                fs.close(fd, function () {
                    next();
                });
            },
            function (next) {
                fs.unlink(filename, function () {
                    next();
                });
            }
        ]);
    }

    dirname.split(path.sep).forEach(function (element, index, array) {
        var directory = array.slice(0, index + 1).join(path.sep);
        actions.push((next:() => void) => {
            fs.mkdir(directory, function (error) {
                if (!error || error.code === "EEXIST") {
                    next();
                } else {
                    callback(error, null);
                }
            });
        });
    });

    actions.push(function (next) {
        function process() {
            fs.open(filename, "wx+", function (error, descriptor) {
                if (!error) {
                    fd = descriptor;
                    next();
                } else if (error.code === "EEXIST") {
                    setTimeout(process, timeout).ref();
                } else {
                    callback(error, null);
                }
            });
        }
        process();
    });

    actions.push(function (next) {
        fs.write(fd, JSON.stringify({pid: process.pid}), function (error) {
            if (!error) {
                next();
            } else {
                callback(error, null);
            }
        });
    });

    actions.push(function () {
        callback(null, unlock);
    });

    deferred(actions);

}

class TryCode {

    private _error:Error = null;

    private _catch:boolean = false;

    private _finally:boolean = false;

    constructor(callback:() => void) {
        try {
            if (isFunction(callback)) {
                callback();
            }
        } catch (error) {
            this._error = <Error>error;
        }
    }

    public catchError(type:any, callback:(error:Error) => void):TryCode {
        if (this._error && !this._catch && this._error instanceof type) {
            this._catch = true;
            callback(this._error);
        }
        return this;
    }

    public finallyCode(callback:() => void):void {
        if (!this._finally && isFunction(callback)) {
            this._finally = true;
            callback();
        }
    }

}

export function tryCode(callback:() => void) {
    return new TryCode(callback);
}

export function installMapping() {
    mappingSupport.install({
        handleUncaughtExceptions: true,
        retrieveSourceMap : function (source) {
            if (fs.existsSync(source + ".map")) {
                return {
                    url : source,
                    map : fs.readFileSync(source + ".map", 'utf8')
                };
            }
            return null;
        }
    });
}

export function template(template:string, ...args:any[]):string {
    return String(template).replace(/(?:\{(\d+)\})/g, (substring:string, ...items:any[]):string => {
        return String(args[parseInt(<string>items[0])] || "");
    });
}
