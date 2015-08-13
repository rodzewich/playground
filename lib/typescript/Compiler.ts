/// <reference path="../compiler/Compiler.ts" />
/// <reference path="./ICompiler.ts" />
/// <reference path="./IOptions.ts" />

import AbstractCompiler = require("../compiler/Compiler");
import ICompiler = require("./ICompiler");
import IOptions = require("./IOptions");

class Compiler extends AbstractCompiler implements ICompiler {

    constructor(options:IOptions) {
        super(options);
    }

    compile(filename:string, callback:(error?:Error, data:any) => void):void {
    }

}