import IBaseCompiler = require("../../compiler/compiler/ICompiler");
import IMemory = require("../../memory/client/IClient");

interface ICompiler extends IBaseCompiler {
    setMemory(value:IMemory):void;
    getMemory():IMemory;
}

export = ICompiler;
