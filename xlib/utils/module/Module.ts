/// <reference path="./loader/ILoader.ts" />
/// <reference path="../../core.ts" />
/// <reference path="../../node.d.ts" />
/// <reference path="./module.d.ts" />

import IModule = require("./IModule");
import ILoader = require("./loader/ILoader");
import core = require("../../core");

var cwd:string,
    modules:any = {},
    loader:ILoader;

class Module {

    public static getCwd():string {
        return cwd;
    }

    public static setCwd(value:string):void {
        cwd = value;
    }

    public static resetCwd():void {
        cwd = undefined;
    }

    public static setLoader(value:ILoader):void {
        loader = value;
    }

    public static getLoader():ILoader {
        return loader;
    }

    public static load(module:string, dependency:string[], callback:(error?:Error, exports?:any) => void):void {
        Module.getLoader().load(module, function (error:Error) {

        });
    }

    public register(module:string, exports:any):void {
        var temp:string = String(module || "");
        if (!temp) {
            throw new Error("bla bla bla");
        }
        if (/\s/.test(temp)) {
            throw new Error("bla bla bla");
        }
        if (core.typeOf(Module._modules[temp]) !== "undefined") {
            throw new Error("bla bla bla");
        }
        if (["object", "function"].indexOf(core.typeOf(exports)) !== -1) {
            Module._modules[temp] = exports;
        } else {
            Module._modules[temp] = {};
        }
    }

    public static require(module:string):any {
        var temp:string = String(module || ""),
            cwd:string[] = String(Module.getCwd()).split("/"),
            path:string[] = temp.split("/"),
            element:string;
        if (!temp) {
            throw new Error("bla bla bla");
        }
        if (/\s/.test(temp)) {
            throw new Error("bla bla bla");
        }
        if (!Module.getCwd()) {
            throw new Error("bla bla bla");
        }
        if (core.typeOf(Module._modules[temp]) === "undefined") {
            throw new Error("Module " + JSON.stringify(temp) + " not found");
        }
        if (path.length > 1 && path[0] === "") {
            throw new Error("bla bla bla");
        }
        if (path.length === 1) {
            // load node internal module
            return nodeRequire(temp);
        }
        while (path.length) {
            element = path.shift();
            if (element === ".." && cwd.length !== 0) {
                cwd.pop();
            } else if (element === ".." && cwd.length === 0) {
                throw new Error("bla bla bla");
            } else if (element === "") {
                throw new Error("bla bla bla");
            } else if (element !== ".") {
                cwd.push(element);
            }
        }
        if (cwd.join("/") === String(Module.getCwd())) {
            throw new Error("bla bla bla");
        }
        return Module._modules[cwd.join("/")];
    }

}

export = Module;
