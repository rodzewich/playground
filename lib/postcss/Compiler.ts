import ICompiler = require("./ICompiler");
import IResult = require("./IResult");
import IOptions = require("./IOptions");
import IPlugin = require("./plugins/IPlugin");
import Base = require("./Base");

class Compiler extends Base implements ICompiler {

    constructor(options?:IOptions) {
        super(options);
    }

    protected getPlugins():IPlugin[] {
        var plugins:IPlugin[] = [];
        plugins = plugins.concat(this.getFallbacks());
        return plugins;
    }

    protected getFallbacks():IPlugin[] {
        return <IPlugin[]>[
            this.getAutoprefixerPlugin()
        ];
    }

    compile(source:string, map?:any, callback?:(errors?:Error[], result?:IResult) => void):void {

    }
}