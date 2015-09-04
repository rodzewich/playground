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
            this.getAutoprefixerPlugin(),
            this.getPseudoElementsPlugin()
        ];
    }

    public compile(source:string, map?:any, callback?:(error?:Error, result?:IResult) => void):void {
        var plugins:any[] = this.getPlugins().map((plugin:IPlugin):void => {
                return plugin.getInstance();
            }),
            prev:any = null;
        if (map) {
            prev = {
                inline: false,
                prev: map,
                sourcesContent: false,
                annotation: false
            };
        }
        postcss(plugins).process(source, {
            parser: postcssSafeParser,
            map: prev
        }).then((result:any):void => {
            callback(null, <IResult>{source: result.css, map: result.map});
        }).catch((error?:Error):void => {
            callback(error, null);
        });
    }
}