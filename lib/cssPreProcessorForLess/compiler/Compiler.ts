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
import IPlugin = require("../plugins/IPlugin");
import PluginName = require("../plugins/Name");
import IBootstrapPlugin = require("../plugins/importers/bootstrap/IPlugin");
import BootstrapPlugin = require("../plugins/importers/bootstrap/Plugin");
import ICardinalPlugin = require("../plugins/importers/cardinal/IPlugin");
import CardinalPlugin = require("../plugins/importers/cardinal/Plugin");
import IFlexBoxGridPlugin = require("../plugins/importers/flexboxgrid/IPlugin");
import FlexBoxGridPlugin = require("../plugins/importers/flexboxgrid/Plugin");
import IIonicPlugin = require("../plugins/importers/ionic/IPlugin");
import IonicPlugin = require("../plugins/importers/ionic/Plugin");
import ILessHatPlugin = require("../plugins/importers/lesshat/IPlugin");
import LessHatPlugin = require("../plugins/importers/lesshat/Plugin");
import INpmImportPlugin = require("../plugins/importers/npmImport/IPlugin");
import NpmImportPlugin = require("../plugins/importers/npmImport/Plugin");
import ISkeletonPlugin = require("../plugins/importers/skeleton/IPlugin");
import SkeletonPlugin = require("../plugins/importers/skeleton/Plugin");


import lessPluginInlineUrls = require("less-plugin-inline-urls");
import LessPluginCleanCss = require('less-plugin-clean-css');

class Compiler extends BaseCompiler implements ICompiler {

    private _bootstrapPlugin:IBootstrapPlugin;
    protected createBootstrapPlugin():IBootstrapPlugin {
        return new BootstrapPlugin();
    }
    protected getBootstrapPlugin():IBootstrapPlugin {
        if (!this._bootstrapPlugin) {
            this._bootstrapPlugin = this.createBootstrapPlugin();
        }
        return this._bootstrapPlugin;
    }

    private _cardinalPlugin:ICardinalPlugin;
    protected createCardinalPlugin():ICardinalPlugin {
        return new CardinalPlugin();
    }
    protected getCardinalPlugin():ICardinalPlugin {
        if (!thia._cardinalPlugin) {
            this._cardinalPlugin = this.createCardinalPlugin();
        }
        return this._cardinalPlugin;
    }

    private _flexBoxGridPlugin:IFlexBoxGridPlugin;
    protected createFlexBoxGridPlugin():IFlexBoxGridPlugin {
        return new FlexBoxGridPlugin();
    }
    protected getFlexBoxGridPlugin():IFlexBoxGridPlugin {
        if (!this._flexBoxGridPlugin) {
            this._flexBoxGridPlugin = this.createFlexBoxGridPlugin();
        }
        return this._flexBoxGridPlugin;
    }

    private _ionicPlugin:IIonicPlugin;
    protected createIonicPlugin():IIonicPlugin {
        return new IonicPlugin();
    }
    protected getIonicPlugin():IIonicPlugin {
        if (!this._ionicPlugin) {
            this._ionicPlugin = this.createIonicPlugin();
        }
        return this._ionicPlugin;
    }

    private _lessHatPlugin:ILessHatPlugin;
    protected createLessHatPlugin():ILessHatPlugin {
        return new LessHatPlugin();
    }
    protected getLessHatPlugin():ILessHatPlugin {
        if (!this._lessHatPlugin) {
            this._lessHatPlugin = this.createLessHatPlugin();
        }
        return this._lessHatPlugin;
    }

    private _npmImportPlugin:INpmImportPlugin;
    protected createNpmImportPlugin():INpmImportPlugin {
        return new NpmImportPlugin();
    }
    protected getNpmImportPlugin():INpmImportPlugin {
        if (!this._npmImportPlugin) {
            this._npmImportPlugin = this.createNpmImportPlugin();
        }
        return this._npmImportPlugin;
    }

    private _skeletonPlugin:ISkeletonPlugin;
    protected createSkeletonPlugin():ISkeletonPlugin {
        return new SkeletonPlugin();
    }
    protected getSkeletonPlugin():ISkeletonPlugin {
        if (!this._skeletonPlugin) {
            this._skeletonPlugin = this.createSkeletonPlugin();
        }
        return this._skeletonPlugin;
    }

    constructor(options:IOptions) {
        super(options);
        if (options && isDefined(options.pluginBootstrapUsed)) {
            this.getBootstrapPlugin().setIsUsed(options.pluginBootstrapUsed);
        }
        if (options && isDefined(options.pluginCardinalUsed)) {
            this.getCardinalPlugin().setIsUsed(options.pluginCardinalUsed);
        }
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

    protected getExtensions():string [] {
        return [".less"];
    }

    private _pluginsPriorities:string[];
    protected createDefaultPluginPriorities():string[] {
        return PluginName.PRIORITIES.map((element:PluginName):string => {
            return element.toString();
        });
    }
    protected getPluginsPriorities():string[] {
        if (this._pluginsPriorities) {
            this._pluginsPriorities = this.createDefaultPluginPriorities();
        }
        return this._pluginsPriorities;
    }
    protected setPluginPriorities(value:string[]):void {
        // todo: check value
        this._pluginsPriorities = this.createDefaultPluginPriorities();
    }

    protected getPlugins(): IPlugin[] {
        var plugins:IPlugin[]   = [
            this.getBootstrapPlugin(),
            this.getCardinalPlugin(),
            this.getFlexBoxGridPlugin(),
            this.getIonicPlugin(),
            this.getIonicPlugin(),
            this.getLessHatPlugin(),
            this.getNpmImportPlugin(),
            this.getSkeletonPlugin()
        ];
        var priorities:string[] = this.getPluginsPriorities();
        return plugins.filter((plugin:IPlugin):boolean => {
            return PluginName.PRIORITIES.indexOf(plugin.getName()) !== -1;
        }).sort((plugin1:IPlugin, plugin2:IPlugin):number => {
            var index1:number = priorities.indexOf(plugin1.getName().toString()),
                index2:number = priorities.indexOf(plugin2.getName().toString());
            return index1 > index2 ? 1 : -1;
        });
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
            plugins   : this.getPlugins().map((plugin:IPlugin):any => {
                return plugin.getInstance()
            })
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