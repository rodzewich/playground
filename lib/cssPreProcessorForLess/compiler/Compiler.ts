/// <reference path="../../../types/node/node.d.ts" />
/// <reference path="./less.d.ts" />

// todo https://www.npmjs.com/search?q=%22less-plugin%22

// PREPROCESSORS
// todo: https://github.com/seven-phases-max/less-plugin-functions
// todo: https://github.com/just-boris/less-plugin-glob
// todo: https://github.com/bassjobsen/less-plugin-group-css-media-queries
// todo: https://github.com/less/less-plugin-inline-urls
// todo: https://github.com/bassjobsen/less-plugin-pleeease
// todo: https://github.com/less/less-plugin-rtl

// todo: https://www.npmjs.com/package/less-plugin-cssgrace
// todo: https://www.npmjs.com/package/less-plugin-property-order
// todo: https://www.npmjs.com/package/less-plugin-est
// todo: https://www.npmjs.com/package/less-plugin-semantic-ui
// todo: https://www.npmjs.com/package/resolution-independence
// todo: https://www.npmjs.com/package/less-plugin-absolute-urls
// todo: https://www.npmjs.com/package/less-plugin-modular-scale
// todo: https://www.npmjs.com/package/less-plugin-pattern-import
/**
 * https://www.npmjs.com/package/less-plugin-no-comment
 * https://www.npmjs.com/package/less-plugin-theme-creator
 * https://www.npmjs.com/package/less-plugin-custom-import
 * https://www.npmjs.com/package/less-plugin-rewrite-import
 * https://www.npmjs.com/package/less-plugin-theme
 * https://www.npmjs.com/package/less-plugin-unique-directives
 * https://www.npmjs.com/package/less-plugin-import-js
 * https://www.npmjs.com/package/less-plugin-absolute-urls
 *
 * https://www.npmjs.com/package/less-plugin-alternative-imports
 * https://www.npmjs.com/package/less-plugin-linter
 * https://www.npmjs.com/package/less-plugin-modular-scale
 * https://www.npmjs.com/package/less-import-aliases
 * https://www.npmjs.com/package/less-src-replace
 * https://www.npmjs.com/package/duo-less
 * https://www.npmjs.com/package/anvil.less
 * https://www.npmjs.com/package/builder-less
 * https://www.npmjs.com/package/k-less
 * https://www.npmjs.com/package/derby-less
 * https://www.npmjs.com/package/ckstyle-less
 * https://www.npmjs.com/package/fis-parser-nuomi-less
 * https://www.npmjs.com/package/wintersmith-less
 * https://www.npmjs.com/package/simpless
 * https://www.npmjs.com/package/bee-less
 * https://www.npmjs.com/package/less-color-lighten
 * https://www.npmjs.com/package/isostyle
 * https://www.npmjs.com/package/steal-less
 * https://www.npmjs.com/package/lineman-less
 * https://www.npmjs.com/package/npm-import-plugin-test
 *
 */

/**
 * UI/Theme Frameworks and Components
 * http://rriepe.github.io/1pxdeep/
 * http://www.flathemes.com/
 * https://www.bootpress.org/
 * http://getbootstrap.com/
 * https://github.com/bassjobsen/bootstrap-a11y-theme
 * http://bootswatch.com/
 * http://cardinalcss.com/
 * https://github.com/firminoweb/csshorus
 * http://designmodo.com/flat-free/
 * https://github.com/vitto/frontsize-less
 * http://brunodsgn.github.io/InContent/
 * http://ink.sapo.pt/
 * http://jbst.eu/
 * http://www.knacss.com/
 * http://imperavi.com/kube/
 * http://metroui.org.ua/
 * http://madscript.com/pre/
 * https://github.com/amazingSurge/prelude
 * http://danmalarkey.github.io/schema/
 * http://www.semantic-ui.com/
 * http://getuikit.com/
 * http://bit.ly/ngBoilerplate
 * http://github.com/metaskills/less-rails
 * https://www.weepower.com/
 */

/**
 * Grid Systems
 * http://flexible.gs/
 * https://github.com/amazingSurge/adaptGrid
 * http://fluidable.com/
 * http://goldengridsystem.com/
 * https://github.com/bassjobsen/LESS-Zen-Grid
 * https://github.com/chromice/order.less
 * https://github.com/BuschFunker/responsibly
 * http://responsiveboilerplate.com/
 * http://semantic.gs/
 */

/**
 * Mixin Libraries
 * see http://lesscss.org/usage/
 *
 */

import LessGlobalVariables = require("../../helpers/LessGlobalVariables");
import ILessGlobalVariables = require("../../helpers/ILessGlobalVariables");
import LessModifyVariables = require("../../helpers/LessModifyVariables");
import ILessModifyVariables = require("../../helpers/ILessModifyVariables");
import isDefined = require("../../isDefined");
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
import IBowerResolvePlugin = require("../plugins/importers/bowerResolve/IPlugin");
import BowerResolvePlugin = require("../plugins/importers/bowerResolve/Plugin");
import IAdvancedColorFunctionsPlugin = require("../plugins/functions/advancedColorFunctions/IPlugin");
import AdvancedColorFunctionsPlugin = require("../plugins/functions/advancedColorFunctions/Plugin");
import ICubehelixPlugin = require("../plugins/functions/cubehelix/IPlugin");
import CubehelixPlugin = require("../plugins/functions/cubehelix/Plugin");
import IListsPlugin = require("../plugins/functions/lists/IPlugin");
import ListsPlugin = require("../plugins/functions/lists/Plugin");
import IAutoprefixPlugin = require("../plugins/postprocessors/autoprefix/IPlugin");
import AutoprefixPlugin = require("../plugins/postprocessors/autoprefix/Plugin");
import ICsscombPlugin = require("../plugins/postprocessors/csscomb/IPlugin");
import CsscombPlugin = require("../plugins/postprocessors/csscomb/Plugin");
import ICleanCssPlugin = require("../plugins/postprocessors/cleanCss/IPlugin");
import CleanCssPlugin = require("../plugins/postprocessors/cleanCss/Plugin");
import ICssWringPlugin = require("../plugins/postprocessors/cssWring/IPlugin");
import CssWringPlugin = require("../plugins/postprocessors/cssWring/Plugin");
import ICssFlipPlugin = require("../plugins/postprocessors/cssFlip/IPlugin");
import CssFlipPlugin = require("../plugins/postprocessors/cssFlip/Plugin");

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
        if (!this._cardinalPlugin) {
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

    private _advancedColorFunctionsPlugin:IAdvancedColorFunctionsPlugin;
    protected createAdvancedColorFunctionsPlugin():IAdvancedColorFunctionsPlugin {
        return new AdvancedColorFunctionsPlugin();
    }
    protected getAdvancedColorFunctionsPlugin():IAdvancedColorFunctionsPlugin {
        if (!this._advancedColorFunctionsPlugin) {
            this._advancedColorFunctionsPlugin = this.createAdvancedColorFunctionsPlugin();
        }
        return this._advancedColorFunctionsPlugin;
    }

    private _bowerResolvePlugin:IBowerResolvePlugin;
    protected createBowerResolvePlugin():IBowerResolvePlugin {
        return new BowerResolvePlugin();
    }
    protected getBowerResolvePlugin():IBowerResolvePlugin {
        if (!this._bowerResolvePlugin) {
            this._bowerResolvePlugin = this.createBowerResolvePlugin();
        }
        return this._bowerResolvePlugin;
    }

    private _cubehelixPlugin:ICubehelixPlugin;
    protected createCubehelixPlugin():ICubehelixPlugin {
        return new CubehelixPlugin();
    }
    protected getCubehelixPlugin():ICubehelixPlugin {
        if (!this._cubehelixPlugin) {
            this._cubehelixPlugin = this.createCubehelixPlugin();
        }
        return this._cubehelixPlugin;
    }

    private _listsPlugin:IListsPlugin;
    protected createListsPlugin():IListsPlugin {
        return new ListsPlugin();
    }
    protected getListsPlugin():IListsPlugin {
        if (!this._listsPlugin) {
            this._listsPlugin = this.createListsPlugin();
        }
        return this._listsPlugin;
    }

    private _autoprefixPlugin:IAutoprefixPlugin;
    public createAutoprefixPlugin():IAutoprefixPlugin {
        return new AutoprefixPlugin();
    }
    public getAutoprefixPlugin():IAutoprefixPlugin {
        if (!this._autoprefixPlugin) {
            this._autoprefixPlugin = this.createAutoprefixPlugin();
        }
        return this._autoprefixPlugin;
    }

    private _csscombPlugin:ICsscombPlugin;
    protected createCsscombPlugin():ICsscombPlugin {
        return new CsscombPlugin();
    }
    protected getCsscombPlugin():ICsscombPlugin {
        if (!this._csscombPlugin) {
            this._csscombPlugin = this.createCsscombPlugin();
        }
        return this._csscombPlugin;
    }

    private _cleanCssPlugin:ICleanCssPlugin;
    protected createCleanCssPlugin():ICleanCssPlugin {
        return new CleanCssPlugin();
    }
    protected getCleanCssPlugin():ICleanCssPlugin {
        if (!this._cleanCssPlugin) {
            this._cleanCssPlugin = this.createCleanCssPlugin();
        }
        return this._cleanCssPlugin;
    }

    private _cssWringPlugin:ICssWringPlugin;
    protected createCssWringPlugin():ICssWringPlugin {
        return new CssWringPlugin();
    }
    protected getCssWringPlugin():ICssWringPlugin {
        if (!this._cssWringPlugin) {
            this._cssWringPlugin = this.createCssWringPlugin();
        }
        return this._cssWringPlugin;
    }

    private _cssFlipPlugin:ICssFlipPlugin;
    protected createCssFlipPlugin():ICssFlipPlugin {
        return new CssFlipPlugin();
    }
    protected getCssFlipPlugin():ICssFlipPlugin {
        if (!this._cssFlipPlugin) {
            this._cssFlipPlugin = this.createCssFlipPlugin();
        }
        return this._cssFlipPlugin;
    }

    constructor(options:IOptions) {
        super(options);
        if (options && isDefined(options.pluginBootstrapUsed)) {
            this.getBootstrapPlugin().setIsUsed(options.pluginBootstrapUsed);
        }
        if (options && isDefined(options.pluginCardinalUsed)) {
            this.getCardinalPlugin().setIsUsed(options.pluginCardinalUsed);
        }
        if (options && isDefined(options.pluginFlexboxgridUsed)) {
            this.getFlexBoxGridPlugin().setIsUsed(options.pluginFlexboxgridUsed);
        }
        if (options && isDefined(options.pluginIonicUsed)) {
            this.getIonicPlugin().setIsUsed(options.pluginIonicUsed);
        }
        if (options && isDefined(options.pluginLesshatUsed)) {
            this.getLessHatPlugin().setIsUsed(options.pluginLesshatUsed);
        }
        if (options && isDefined(options.pluginNpmImportUsed)) {
            this.getNpmImportPlugin().setIsUsed(options.pluginNpmImportUsed);
        }
        if (options && isDefined(options.pluginNpmImportPrefix)) {
            this.getNpmImportPlugin().setPrefix(options.pluginNpmImportPrefix);
        }
        if (options && isDefined(options.pluginSkeletonUsed)) {
            this.getSkeletonPlugin().setIsUsed(options.pluginSkeletonUsed);
        }
        if (options && isDefined(options.pluginBowerResolveUsed)) {
            this.getBowerResolvePlugin().setIsUsed(options.pluginBowerResolveUsed);
        }
        if (options && isDefined(options.pluginAdvancedColorFunctionsUsed)) {
            this.getAdvancedColorFunctionsPlugin().setIsUsed(options.pluginAdvancedColorFunctionsUsed);
        }
        if (options && isDefined(options.pluginCubehelixUsed)) {
            this.getCubehelixPlugin().setIsUsed(options.pluginCubehelixUsed);
        }
        if (options && isDefined(options.pluginListsUsed)) {
            this.getListsPlugin().setIsUsed(options.pluginListsUsed);
        }
        if (options && isDefined(options.pluginAutoprefixUsed)) {
            this.getAutoprefixPlugin().setIsUsed(options.pluginAutoprefixUsed);
        }
        if (options && isDefined(options.pluginAutoprefixBrowsers)) {
            this.getAutoprefixPlugin().setBrowsers(options.pluginAutoprefixBrowsers);
        }
        // todo: implement other autoprefixer options
        if (options && isDefined(options.pluginCsscombUsed)) {
            this.getCsscombPlugin().setIsUsed(options.pluginCsscombUsed);
        }
        if (options && isDefined(options.pluginCsscombConfig)) {
            this.getCsscombPlugin().setConfig(options.pluginCsscombConfig);
        }
        if (options && isDefined(options.pluginCleanCssUsed)) {
            this.getCleanCssPlugin().setIsUsed(options.pluginCleanCssUsed);
        }
        if (options && isDefined(options.pluginCssWringUsed)) {
            this.getCssWringPlugin().setIsUsed(options.pluginCssWringUsed);
        }
        if (options && isDefined(options.pluginCssWringPreserveHacks)) {
            this.getCssWringPlugin().setIsPreserveHacks(options.pluginCssWringPreserveHacks);
        }
        if (options && isDefined(options.pluginCssWringRemoveAllComments)) {
            this.getCssWringPlugin().setIsPreserveHacks(options.pluginCssWringRemoveAllComments);
        }
        if (options && isDefined(options.pluginCssFlipUsed)) {
            this.getCssFlipPlugin().setIsUsed(options.pluginCssFlipUsed);
        }
        // todo: implement other clean-css options
        if (options && isDefined(options.pluginsPriorities)) {
            this.setPluginPriorities(options.pluginsPriorities);
        }

        if (options && isDefined(options.globalVariables)) {
            this.setGlobalVariables(options.globalVariables);
        }
        if (options && isDefined(options.modifyVariables)) {
            this.setGlobalVariables(options.modifyVariables);
        }
    }



    private _globalVariablesInstance:ILessGlobalVariables;
    protected createGlobalVariablesInstance():ILessGlobalVariables {
        return new LessGlobalVariables();
    }
    protected getGlobalVariablesInstance():ILessGlobalVariables {
        if (!this._globalVariablesInstance) {
            this._globalVariablesInstance = this.createGlobalVariablesInstance();
        }
    }
    protected getGlobalVariable(name:string):any {
        return this.getGlobalVariablesInstance().getVariable(name);
    }
    protected setGlobalVariable(name:string, value:any):any {
        this.getGlobalVariablesInstance().setVariable(name, value);
    }
    protected getGlobalVariables():any {
        return this.getGlobalVariablesInstance().getVariables();
    }
    protected setGlobalVariables(value:any):void {
        this.getGlobalVariables().setVariables(value);
    }


    private _modifyVariablesInstance:ILessModifyVariables;
    protected createModifyVariablesInstance():ILessModifyVariables {
        return new LessModifyVariables();
    }
    protected getModifyVariablesInstance():ILessModifyVariables {
        if (!this._modifyVariablesInstance) {
            this._modifyVariablesInstance = this.createModifyVariablesInstance();
        }
    }
    protected getModifyVariable(name:string):any {
        return this.getModifyVariablesInstance().getVariable(name);
    }
    protected setModifyVariable(name:string, value:any):any {
        this.getModifyVariablesInstance().setVariable(name, value);
    }
    protected getModifyVariables():any {
        return this.getModifyVariablesInstance().getVariables();
    }
    protected setModifyVariables(value:any):void {
        this.getModifyVariables().setVariables(value);
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
        var plugins:IPlugin[] = [
            this.getBootstrapPlugin(),
            this.getCardinalPlugin(),
            this.getFlexBoxGridPlugin(),
            this.getIonicPlugin(),
            this.getIonicPlugin(),
            this.getLessHatPlugin(),
            this.getNpmImportPlugin(),
            this.getSkeletonPlugin(),
            this.getBowerResolvePlugin(),
            this.getAdvancedColorFunctionsPlugin(),
            this.getAutoprefixPlugin(),
            this.getCleanCssPlugin(),
            this.getCssWringPlugin(),
            this.getCssFlipPlugin()
        ];
        var priorities:string[] = this.getPluginsPriorities();
        return plugins
            .filter((plugin:IPlugin):boolean => {
                return PluginName.PRIORITIES.indexOf(plugin.getName()) !== -1;
            })
            .sort((plugin1:IPlugin, plugin2:IPlugin):number => {
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
            modifyVars: this.getModifyVariables(), // todo: проверить, что такой финт возможен
            globalVars: this.getGlobalVariables(), // todo: проверить, что такой финт возможен
            plugins   : this.getPlugins()
                .filter((plugin:IPlugin):boolean => {
                    return plugin.isUsed()
                })
                .map((plugin:IPlugin):any => {
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