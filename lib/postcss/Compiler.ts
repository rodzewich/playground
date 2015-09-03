import ICompiler = require("./ICompiler");
import IResult = require("./IResult");
import IOptions = require("./IOptions");
import IPlugin = require("./plugins/IPlugin");

class Compiler implements ICompiler {

    constructor(options?:IOptions) {

    }

    protected getPlugins():IPlugin[] {
        var plugins:IPlugin[] = [];
        plugins = plugins.concat(this.getFallbacks());
        return plugins;
    }

    protected getFallbacks():IPlugin[] {
        var fallbacks:IPlugin = [];
        return fallbacks;
    }

    compile(source:string, map?:any, callback?:(errors?:Error[], result?:IResult) => void):void {

    }
}