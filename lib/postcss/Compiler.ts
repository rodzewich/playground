/// <reference path="./postcss.d.ts" />
/// <reference path="./safe-parser.d.ts" />

import ICompiler = require("./ICompiler");
import IResult = require("./IResult");
import IOptions = require("./IOptions");
import IPlugin = require("./plugins/IPlugin");
import Base = require("./Base");
import IWarning = require("./IWarning");
import Warning = require("./Warning");
import postcss = require("postcss");
import postcssSafeParser = require("postcss-safe-parser");
import sourceMap = require('source-map');

abstract class Compiler extends Base implements ICompiler {

    constructor(options?:IOptions) {
        super(options);
    }

    protected getPlugins():IPlugin[] {
        return <IPlugin[]>[];
    }

    public compile(source:string, map?:any, callback?:(error:Error, result:IResult) => void):void {
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
            var sm = new sourceMap.SourceMapConsumer(map);
            result.warnings().map((item: any):IWarning => {
                var line: number;
                var column: number;
                var filename: string;
                sm.eachMapping((map): void => {
                    if (item.line >= map.generatedLine && item.column >= map.generatedColumn) {
                        line = map.originalLine;
                        column = map.originalColumn + 1;
                        filename = map.source;
                    }
                });
                console.log("filename: ", filename, ["(", line, ":", column , ")"].join(""));
                return null;
            });
            callback(null, <IResult>{result: result.css, map: result.map, messages: null});
        }).catch((error?:Error):void => {
            callback(error, null);
        });
    }
}

export = Compiler;
