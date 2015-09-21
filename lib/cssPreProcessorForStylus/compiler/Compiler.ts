/// <reference path="../../../types/node/node.d.ts" />
/// <reference path="./autoprefixer.d.ts" />
/// <reference path="./stylus.d.ts" />

// todo: уметь использовать globals, functions, imports
// todo: уметь устанавливать переменные
// todo: уметь устанавливать дефолтные импорты
// todo: уметь устанавливать плагины
// todo: подружить с Autoprefixer
// todo использовать https://github.com/rossPatton/stylint
// todo использовать http://nibstyl.us/#installation

import BaseCompiler = require("../../cssPreProcessorAbstract/compiler/Compiler");
import IOptions = require("./IOptions");
import ICompiler = require("./ICompiler");
import stylus = require("stylus");

class Compiler extends BaseCompiler implements ICompiler {

    constructor(options:IOptions) {
        super(options);
    }

    protected getExtensions():string [] {
        return [".styl"];
    }

    protected preProcessing(options:{filename: string; content: string;}, callback:(errors:Error[], result:{css: string; maps: any; deps: string[];}) => void):void {
        var compiler:any,
            includeDirectories = this.getIncludeDirectories();
        includeDirectories.unshift(this.getSourcesDirectory());
        compiler = stylus(options.content).
            set("filename", options.filename).
            set("compress", true).
            set("sourcemap", {
                inline     : false,
                comment    : false,
                basePath   : "/",
                sourceRoot : null
            }).
            set("paths", this.getIncludeDirectories());
        compiler.render((error:Error, css:string):void => {
            if (!error) {
                if (compiler.sourcemap && compiler.sourcemap.sources) {
                    compiler.sourcemap.sources = compiler.sourcemap.sources.map((filename: string): string => {
                        return path.join("/", filename);
                    })
                }
                callback(null, {
                    css  : css,
                    maps : compiler.sourcemap || {},
                    deps : compiler.deps() || []
                });
            } else {
                // todo: use StylusException
                callback([error], null);
            }
        });
    }

}

export = Compiler;