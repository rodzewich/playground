import IResult = require("./IResult");

interface ICompiler {
    compile(source:string, map?:any, contents:{[index: string]: string}, callback?:(error:Error, result:IResult) => void): void;
}

export = ICompiler;
