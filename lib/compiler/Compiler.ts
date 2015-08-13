/// <reference path="./ICompiler.ts" />

import ICompiler = require("./ICompiler");
import IOptions = require("./IOptions");

class Compiler implements ICompiler {

    protected _memoryLocation: string;

    constructor(options:IOptions) {
        this.setMemoryLocation(options.memoryLocation);
    }

    protected setMemoryLocation(value: string): void {
        this._memoryLocation = String(value);
    }

    protected getMemoryLocation(): string {
        return this._memoryLocation;
    }

    public compile(filename:string, callback:(error?:Error, data?:any) => void):void {
    }

}
