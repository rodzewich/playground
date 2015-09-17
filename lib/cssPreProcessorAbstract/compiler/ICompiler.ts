import IBaseCompiler = require("../../compiler/compiler/ICompiler");

interface ICompiler extends IBaseCompiler {
    setMemory(value:IMemory):void;
    getMemory():IMemory;
}

export = ICompiler;
