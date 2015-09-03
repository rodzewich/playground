import IResult = require("./IResult");

interface ICompiler {
    compile(source:string, map?:any, callback?:(errors?:Error[], result?:IResult) => void): void;
}

export = ICompiler;
