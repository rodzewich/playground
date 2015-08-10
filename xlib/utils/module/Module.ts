/// <reference path="./IModule.ts" />
/// <reference path="./loader/ILoader.ts" />
/// <reference path="../../core.ts" />
/// <reference path="../../node.d.ts" />
/// <reference path="./module.d.ts" />

import IModule = require("./IModule");
import ILoader = require("./loader/ILoader");
import core = require("../../core");

class Module implements IModule {

    protected _cwd:string;

    protected _modules:any = {};

    protected _loader:ILoader;

    public getCwd():string {
        return this._cwd;
    }

    public setCwd(value:string):void {
        this._cwd = value;
    }

    public resetCwd():void {
        this._cwd = undefined;
    }

    public setLoader(value:ILoader):void {
        this._loader = value;
    }

    public getLoader():ILoader {
        return this._loader;
    }

    public load(module:string, dependency:string[], callback:(error?:Error, exports?:any) => void):void {
        this.getLoader().load(module, function (error:Error) {

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
        if (core.typeOf(this._modules[temp]) !== "undefined") {
            throw new Error("bla bla bla");
        }
        if (["object", "function"].indexOf(core.typeOf(exports)) !== -1) {
            this._modules[temp] = exports;
        } else {
            this._modules[temp] = {};
        }
    }

    public require(module:string):any {
        var temp:string = String(module || ""),
            cwd:string[] = String(this.getCwd()).split("/"),
            path:string[] = temp.split("/"),
            element:string;
        if (!temp) {
            throw new Error("bla bla bla");
        }
        if (/\s/.test(temp)) {
            throw new Error("bla bla bla");
        }
        if (!this.getCwd()) {
            throw new Error("bla bla bla");
        }
        if (core.typeOf(this._modules[temp]) === "undefined") {
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
        if (cwd.join("/") === String(this.getCwd())) {
            throw new Error("bla bla bla");
        }
        return this._modules[cwd.join("/")];
    }

}

export = Module;
