/// <reference path="./IOptions.ts" />
/// <reference path="./ICompiler.ts" />
/// <reference path="../../typeOf.ts" />
/// <reference path="../../../types/node/node.d.ts" />
/// <reference path="../../memory/client/IClient" />

import IOptions = require("./IOptions");
import ICompiler = require("./ICompiler");
import typeOf = require("../../typeOf");
import IMemory = require("../../memory/client/IClient");

class Compiler implements ICompiler {

    private _memory: IMemory;

    private _filename:string;

    private _sourcesDirectory: string;

    constructor(options?:IOptions) {
        if (options && options.filename) {
            this.setFilename(options.filename);
        }
        if (options && options.sourcesDirectory) {
            this.setSourcesDirectory(options.sourcesDirectory);
        }
        if (options && typeOf(options.memory)) {
            this.setMemory(options.memory);
        }
    }

    public setMemory(value: IMemory): void {
        this._memory = value;
    }

    public getMemory(): IMemory {
        return this._memory;
    }

    protected getFilename():string {
        return this._filename;
    }

    protected setFilename(value:string):void {
        this._filename = value;
    }

    protected setSourcesDirectory(value: string): void {
        this._sourcesDirectory = value;
    }

    protected getSourcesDirectory(): string {
        return this._sourcesDirectory;
    }

    public compile(callback:(errors?:Error[], result?:any) => void):void {
        setTimeout(():void => {
            if (typeOf(callback) === "function") {
                callback(null, null);
            }
        }, 0).ref();
    }

}

export = Compiler;
