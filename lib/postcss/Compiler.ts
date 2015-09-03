import ICompiler = require("./ICompiler");
import IResult = require("./IResult");
import IOptions = require("./IOptions");
import IPlugin = require("./plugins/IPlugin");
import Base = require("./Base");
import postcss = require("postcss");
import postcssSafeParser = require("postcss-safe-parser");

class Compiler extends Base implements ICompiler {

    constructor(options?:IOptions) {
        super(options);
    }

    protected getPlugins():IPlugin[] {
        return <IPlugin[]>[
            this.getAutoprefixerPlugin()
        ];
    }

    compile(source:string, map?:any, callback?:(errors?:Error[], result?:IResult) => void):void {
        var plugins: any[] = this.getPlugins().map((plugin: IPlugin): void => {
            return plugin.getInstance();
        });
        postcss(this.getPlugins().map((plugin:IPlugin):void => {
            return plugin.getInstance();
        })).process(source, {
            parser: postcssSafeParser,
            map: {
                inline: false,
                prev: options.map || false,
                sourcesContent: false,
                annotation: false
            }
        }).then((result:any):void => {
            callback(null, {content: result.css, map: result.map});
        }).catch((error?:Error): void => {

        });
    }
}