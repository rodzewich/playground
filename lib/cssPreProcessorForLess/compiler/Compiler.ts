/// <reference path="../../../types/node/node.d.ts" />
/// <reference path="./less.d.ts" />

// todo: уметь устанавливать переменные
// todo: уметь устанавливать дефолтные импорты
// todo: уметь устанавливать плагины
// todo: уметь использовать Autoprefixer

import BaseCompiler = require("../../cssPreProcessorAbstract/compiler/Compiler");
import IOptions = require("./IOptions");
import ICompiler = require("./ICompiler");
import less = require("less");
import path = require("path");

class Compiler extends BaseCompiler implements ICompiler {

    constructor(options:IOptions) {
        super(options);
    }

    protected getExtensions():string [] {
        return [".less"];
    }

    protected preProcessing(options:{filename: string; content: string;}, callback:(errors:Error[], result:{css: string; maps: any; deps: string[];}) => void):void {
        var includeDirectories = this.getIncludeDirectories().slice(0);
        includeDirectories.unshift(this.getSourcesDirectory());
        less.render(options.content, <less.Options>{
            paths     : this.getIncludeDirectories(),
            filename  : path.join(options.filename),
            compress  : true,
            sourceMap : true,
            lint      : true
        }, (error:Error, result:less.Result):void => {
            if (!error) {
                callback(null, {
                    css  : result.css,
                    maps : JSON.parse(String(result.map || "{}")), // todo: error place
                    deps : result.imports || []
                });
            } else {
                // todo: use LessException
                callback([error], null);
            }
        });
    }

}

export = Compiler;