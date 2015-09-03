import ICompiler = require("./ICompiler");
import IResult = require("./IResult");
import IOptions = require("./IOptions");

class Compiler implements ICompiler {

    constructor(options?:IOptions) {

    }

    compile(source:string, map?:any, callback?:(errors?:Error[], result?:IResult) => void):void {

    }
}