/// <reference path="../../../types/node/node.d.ts" />
/// <reference path="./less.d.ts" />

// todo: уметь устанавливать переменные
// todo: уметь устанавливать дефолтные импорты
// todo: уметь устанавливать плагины
// todo: уметь использовать Autoprefixer
// todo использовать http://lesscss.org/usage/#plugins-list-of-less-plugins
// todo использовать https://www.npmjs.com/browse/keyword/less%20plugins
// todo: less-plugin-bower-resolve
// todo: less-plugin-lists

import BaseCompiler = require("../../cssPreProcessorAbstract/compiler/Compiler");
import IOptions = require("./IOptions");
import ICompiler = require("./ICompiler");
import less = require("less");
import path = require("path");
import lessInlineUrls = require("less-plugin-inline-urls");
import LessCleanCss = require('less-plugin-clean-css');
import LessNpmImport = require("less-plugin-npm-import");
import LessBootstrap = require('less-plugin-bootstrap');
import LessCardinal = require("less-plugin-cardinal");
import LessFlexboxgrid = require('less-plugin-flexboxgrid');
import LessIonic = require('less-plugin-ionic');
import LessHat = require('less-plugin-lesshat');
import LessSkeleton = require('less-plugin-skeleton');
import LessAdvancedColorFunctions = require("less-plugin-advanced-color-functions");
import LessCubehelix = require("less-plugin-cubehelix");

class Compiler extends BaseCompiler implements ICompiler {

    constructor(options:IOptions) {
        super(options);
    }

    protected isUsedInlineUrls(): boolean {
        return true;
    }

    protected isUsedCleanCss(): boolean {
        return true;
    }

    protected isUsedCleanCssAdvanced(): boolean {
        return true;
    }

    protected isUsedNpmImport(): boolean {
        return true;
    }

    protected isUsedBootstrap(): boolean {
        return true;
    }

    protected getNpmImportPrefix(): string {
        return "npm://";
    }

    protected isUsedCardinal(): boolean {
        return true;
    }

    protected isUsedFlexboxgrid(): boolean {
        return true;
    }

    protected isUsedIonic(): boolean {
        return true;
    }

    protected getExtensions():string [] {
        return [".less"];
    }

    protected isUsedLessHat(): boolean {
        return true;
    }

    protected isUsedSkeleton(): boolean {
        return true;
    }

    protected isUsedAdvancedColorFunctions(): boolean {
        return true;
    }

    protected isUsedCubehelix(): boolean {
        return true;
    }

    protected getPluginsPriorities(): string[] {
        return [];
    }

    protected getPlugins(): any[] { // todo: chenge type
        var plugins: any[] = [];
        if (this.isUsedInlineUrls()) {
            plugins.push(lessInlineUrls);
        }
        if (this.isUsedCleanCss()) {
            plugins.push(new LessCleanCss({advanced: this.isUsedCleanCssAdvanced()}));
        }
        if (this.isUsedNpmImport()) {
            plugins.push(new LessNpmImport({prefix: this.getNpmImportPrefix()}));
        }
        if (this.isUsedBootstrap()) {
            plugins.push(new LessBootstrap());
        }
        if (this.isUsedCardinal()) {
            plugins.push(new LessCardinal());
        }
        if (this.isUsedFlexboxgrid()) {
            plugins.push(new LessFlexboxgrid());
        }
        if (this.isUsedIonic()) {
            plugins.push(new LessIonic());
        }
        if (this.isUsedLessHat()) {
            plugins.push(new LessHat());
        }
        if (this.isUsedSkeleton()) {
            plugins.push(new LessSkeleton());
        }
        if (this.isUsedAdvancedColorFunctions()) {
            plugins.push(new LessAdvancedColorFunctions());
        }
        if (this.isUsedCubehelix()) {
            plugins.push(new LessCubehelix());
        }
        return plugins;
    }

    protected preProcessing(options:{filename: string; content: string;}, callback:(errors:Error[], result:{css: string; maps: any; deps: string[];}) => void):void {
        var includeDirectories = this.getIncludeDirectories().slice(0);
        includeDirectories.unshift(this.getSourcesDirectory());
        less.render(options.content, <less.Options>{
            paths     : this.getIncludeDirectories(),
            filename  : path.join(options.filename),
            compress  : true,
            sourceMap : true,
            lint      : true,
            plugins   : this.getPlugins()
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