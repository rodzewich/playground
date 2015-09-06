/// <reference path="./postcss.d.ts" />
/// <reference path="./safe-parser.d.ts" />

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
            this.getPseudoElementsPlugin(),
            this.getEpubPlugin(),
            this.getWillChangePlugin(),
            this.getAutoprefixerPlugin(),
            this.getCssgracePlugin(),
            this.getOpacityPlugin(),
            this.getVminPlugin(),
            this.getColorRgbaPlugin(),
            this.getPixremPlugin()
        ];
    }

    public compile(source:string, map?:any, callback?:(error?:Error, result?:IResult) => void):void {
        var plugins:any[] = this.getPlugins().filter((plugin:IPlugin):boolean => {
                return plugin.isEnabled() && plugin.isUsed();
            }).map((plugin:IPlugin):any => {
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
            callback(null, <IResult>{result: result.css, map: result.map});
        }).catch((error?:Error):void => {
            callback(error, null);
        });
    }
}

export = Compiler;
