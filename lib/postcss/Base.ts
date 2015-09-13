import IOptions = require("./IOptions");
import typeOf = require("../typeOf");
import IPlugin = require("./plugins/IPlugin");
import IPostcssAutoprefixerPlugin = require("./plugins/fallbacks/autoprefixer/IPlugin");
import PostcssAutoprefixerPlugin = require("./plugins/fallbacks/autoprefixer/Plugin");
import IPostcssPseudoElementsPlugin = require("./plugins/fallbacks/pseudoElements/IPlugin");
import PostcssPseudoElementsPlugin = require("./plugins/fallbacks/pseudoElements/Plugin");
import IPostcssEpubPlugin = require("./plugins/fallbacks/epub/IPlugin");
import PostcssEpubPlugin = require("./plugins/fallbacks/epub/Plugin");
import IPostcssOpacityPlugin = require("./plugins/fallbacks/opacity/IPlugin");
import PostcssOpacityPlugin = require("./plugins/fallbacks/opacity/Plugin");
import IPostcssVminPlugin = require("./plugins/fallbacks/vmin/IPlugin");
import PostcssVminPlugin = require("./plugins/fallbacks/vmin/Plugin");
import IPostcssColorRgbaPlugin = require("./plugins/fallbacks/colorRgba/IPlugin");
import PostcssColorRgbaPlugin = require("./plugins/fallbacks/colorRgba/Plugin");
import IPostcssCssgracePlugin = require("./plugins/fallbacks/cssgrace/IPlugin");
import PostcssCssgracePlugin = require("./plugins/fallbacks/cssgrace/Plugin");
import PostcssWillChangePlugin = require("./plugins/fallbacks/willChange/Plugin");
import IPostcssWillChangePlugin = require("./plugins/fallbacks/willChange/IPlugin");
import PostcssPixremPlugin = require("./plugins/fallbacks/pixrem/Plugin");
import IPostcssPixremPlugin = require("./plugins/fallbacks/pixrem/IPlugin");
import PostcssBemLinterPlugin = require("./plugins/analysis/bemLinter/Plugin");
import IPostcssBemLinterPlugin = require("./plugins/analysis/bemLinter/IPlugin");

class Base {

    private _autoprefixerPlugin:IPostcssAutoprefixerPlugin = new PostcssAutoprefixerPlugin();

    private _pseudoElementsPlugin:IPostcssPseudoElementsPlugin = new PostcssPseudoElementsPlugin();

    private _epubElementPlugin:IPostcssEpubPlugin = new PostcssEpubPlugin();

    private _opacityPlugin:IPostcssOpacityPlugin = new PostcssOpacityPlugin();

    private _vminPlugin:IPostcssVminPlugin = new PostcssVminPlugin();

    private _colorRgbaPlugin:IPostcssColorRgbaPlugin = new PostcssColorRgbaPlugin();

    private _cssgracePlugin:IPostcssCssgracePlugin = new PostcssCssgracePlugin();

    private _willChangePlugin:IPostcssWillChangePlugin = new PostcssWillChangePlugin();

    private _pixremPlugin:IPostcssPixremPlugin = new PostcssPixremPlugin();

    private _bemLinterPlugin:IPostcssBemLinterPlugin = new PostcssBemLinterPlugin();

    constructor(options?:IOptions) {
        var plugins:IPlugin[] = this.getPlugins(),
            autoprefixerPlugin:IPostcssAutoprefixerPlugin = this.getAutoprefixerPlugin(),
            pseudoElementsPlugin:IPostcssPseudoElementsPlugin = this.getPseudoElementsPlugin(),
            epubPlugin:IPostcssEpubPlugin = this.getEpubPlugin(),
            opacityPlugin:IPostcssOpacityPlugin = this.getOpacityPlugin(),
            vminPlugin:IPostcssVminPlugin = this.getVminPlugin(),
            colorRgbaPlugin:IPostcssVminPlugin = this.getColorRgbaPlugin(),
            cssgracePlugin:IPostcssCssgracePlugin = this.getCssgracePlugin(),
            willChangePlugin:IPostcssWillChangePlugin = this.getWillChangePlugin();
        if (options && typeOf(options.postcssPluginAutoprefixerEnabled) !== "undefined") {
            autoprefixerPlugin.setIsEnabled(options.postcssPluginAutoprefixerEnabled);
        }
        if (options && typeOf(options.postcssPluginAutoprefixerUsed) !== "undefined") {
            autoprefixerPlugin.setIsUsed(options.postcssPluginAutoprefixerUsed);
        }
        if (options && typeOf(options.postcssPluginAutoprefixerBrowsers) !== "undefined") {
            autoprefixerPlugin.setBrowsers(options.postcssPluginAutoprefixerBrowsers);
        }
        if (options && typeOf(options.postcssPluginAutoprefixerCascade) !== "undefined") {
            autoprefixerPlugin.setIsCascade(options.postcssPluginAutoprefixerCascade);
        }
        if (options && typeOf(options.postcssPluginAutoprefixerRemove) !== "undefined") {
            autoprefixerPlugin.setIsRemove(options.postcssPluginAutoprefixerRemove);
        }
        if (options && typeOf(options.postcssPluginAutoprefixerAdd) !== "undefined") {
            autoprefixerPlugin.setIsAdd(options.postcssPluginAutoprefixerAdd);
        }
        if (options && typeOf(options.postcssPluginPseudoElementsEnabled) !== "undefined") {
            pseudoElementsPlugin.setIsEnabled(options.postcssPluginPseudoElementsEnabled);
        }
        if (options && typeOf(options.postcssPluginPseudoElementsUsed) !== "undefined") {
            pseudoElementsPlugin.setIsUsed(options.postcssPluginPseudoElementsUsed);
        }
        if (options && typeOf(options.postcssPluginPseudoElementsSelectors) !== "undefined") {
            pseudoElementsPlugin.setSelectors(options.postcssPluginPseudoElementsSelectors);
        }
        if (options && typeOf(options.postcssPluginEpubEnabled) !== "undefined") {
            epubPlugin.setIsEnabled(options.postcssPluginEpubEnabled);
        }
        if (options && typeOf(options.postcssPluginEpubUsed) !== "undefined") {
            epubPlugin.setIsUsed(options.postcssPluginEpubUsed);
        } else {
            epubPlugin.setIsUsed(true);
        }
        if (options && typeOf(options.postcssPluginEpubFonts) !== "undefined") {
            epubPlugin.setIsFonts(options.postcssPluginEpubFonts);
        }
        if (options && typeOf(options.postcssPluginEpubStrip) !== "undefined") {
            epubPlugin.setIsStrip(options.postcssPluginEpubStrip);
        }
        if (options && typeOf(options.postcssPluginEpubStrict) !== "undefined") {
            epubPlugin.setIsStrict(options.postcssPluginEpubStrict);
        }
        if (options && typeOf(options.postcssPluginOpacityEnabled) !== "undefined") {
            opacityPlugin.setIsEnabled(options.postcssPluginOpacityEnabled);
        }
        if (options && typeOf(options.postcssPluginOpacityUsed) !== "undefined") {
            opacityPlugin.setIsUsed(options.postcssPluginOpacityUsed);
        }
        if (options && typeOf(options.postcssPluginVminEnabled) !== "undefined") {
            vminPlugin.setIsEnabled(options.postcssPluginVminEnabled);
        }
        if (options && typeOf(options.postcssPluginVminUsed) !== "undefined") {
            vminPlugin.setIsUsed(options.postcssPluginVminUsed);
        }
        if (options && typeOf(options.postcssPluginColorRgbaEnabled) !== "undefined") {
            colorRgbaPlugin.setIsEnabled(options.postcssPluginColorRgbaEnabled);
        }
        if (options && typeOf(options.postcssPluginColorRgbaUsed) !== "undefined") {
            colorRgbaPlugin.setIsUsed(options.postcssPluginColorRgbaUsed);
        }
        if (options && typeOf(options.postcssPluginCssgraceEnabled) !== "undefined") {
            cssgracePlugin.setIsEnabled(options.postcssPluginCssgraceEnabled);
        }
        if (options && typeOf(options.postcssPluginCssgraceUsed) !== "undefined") {
            cssgracePlugin.setIsUsed(options.postcssPluginCssgraceUsed);
        }
        if (options && typeOf(options.postcssPluginWillChangeEnabled) !== "undefined") {
            willChangePlugin.setIsEnabled(options.postcssPluginWillChangeEnabled);
        }
        if (options && typeOf(options.postcssPluginWillChangeUsed) !== "undefined") {
            willChangePlugin.setIsUsed(options.postcssPluginWillChangeUsed);
        }
        if (plugins.indexOf(this.getPseudoElementsPlugin()) === -1) {
            this.getPseudoElementsPlugin().setIsEnabled(false);
        }
        if (plugins.indexOf(this.getEpubPlugin()) === -1) {
            this.getEpubPlugin().setIsEnabled(false);
        }
        if (plugins.indexOf(this.getWillChangePlugin()) === -1) {
            this.getWillChangePlugin().setIsEnabled(false);
        }
        if (plugins.indexOf(this.getAutoprefixerPlugin()) === -1) {
            this.getAutoprefixerPlugin().setIsEnabled(false);
        }
        if (plugins.indexOf(this.getCssgracePlugin()) === -1) {
            this.getCssgracePlugin().setIsEnabled(false);
        }
        if (plugins.indexOf(this.getOpacityPlugin()) === -1) {
            this.getOpacityPlugin().setIsEnabled(false);
        }
        if (plugins.indexOf(this.getVminPlugin()) === -1) {
            this.getVminPlugin().setIsEnabled(false);
        }
        if (plugins.indexOf(this.getColorRgbaPlugin()) === -1) {
            this.getColorRgbaPlugin().setIsEnabled(false);
        }
        if (plugins.indexOf(this.getPixremPlugin()) === -1) {
            this.getPixremPlugin().setIsEnabled(false);
        }
    }

    protected getPlugins():IPlugin[] {
        return <IPlugin[]>[];
    }

    protected getAutoprefixerPlugin():IPostcssAutoprefixerPlugin {
        return this._autoprefixerPlugin;
    }

    protected getPseudoElementsPlugin():IPostcssPseudoElementsPlugin {
        return this._pseudoElementsPlugin;
    }

    protected getEpubPlugin():IPostcssEpubPlugin {
        return this._epubElementPlugin;
    }

    protected getOpacityPlugin():IPostcssOpacityPlugin {
        return this._opacityPlugin;
    }

    protected getVminPlugin():IPostcssVminPlugin {
        return this._vminPlugin;
    }

    protected getColorRgbaPlugin():IPostcssColorRgbaPlugin {
        return this._colorRgbaPlugin;
    }

    protected getCssgracePlugin():IPostcssCssgracePlugin {
        return this._cssgracePlugin;
    }

    protected getWillChangePlugin():IPostcssWillChangePlugin {
        return this._willChangePlugin;
    }

    protected getPixremPlugin():IPostcssPixremPlugin {
        return this._pixremPlugin;
    }

    protected getBemLinterPlugin(): IPostcssBemLinterPlugin {
        return this._bemLinterPlugin;
    }

    public getOptions():IOptions {
        var autoprefixerPlugin:IPostcssAutoprefixerPlugin = this.getAutoprefixerPlugin(),
            pseudoElementsPlugin:IPostcssPseudoElementsPlugin = this.getPseudoElementsPlugin(),
            epubPlugin:IPostcssEpubPlugin = this.getEpubPlugin(),
            opacityPlugin:IPostcssOpacityPlugin = this.getOpacityPlugin(),
            vminPlugin:IPostcssVminPlugin = this.getVminPlugin(),
            colorRgbaPlugin:IPostcssVminPlugin = this.getColorRgbaPlugin(),
            cssgracePlugin:IPostcssCssgracePlugin = this.getCssgracePlugin(),
            willChangePlugin:IPostcssWillChangePlugin = this.getWillChangePlugin(),
            pixremPlugin:IPostcssPixremPlugin = this.getPixremPlugin(),
            options:IOptions = {};
        if (autoprefixerPlugin.isEnabled()) {
            options.postcssPluginAutoprefixerEnabled = autoprefixerPlugin.isEnabled();
            options.postcssPluginAutoprefixerUsed = autoprefixerPlugin.isUsed();
            options.postcssPluginAutoprefixerBrowsers = autoprefixerPlugin.getBrowsers();
            options.postcssPluginAutoprefixerCascade = autoprefixerPlugin.isCascade();
            options.postcssPluginAutoprefixerRemove = autoprefixerPlugin.isRemove();
            options.postcssPluginAutoprefixerAdd = autoprefixerPlugin.isAdd();
        }
        if (pseudoElementsPlugin.isEnabled()) {
            options.postcssPluginPseudoElementsEnabled = pseudoElementsPlugin.isEnabled();
            options.postcssPluginPseudoElementsUsed = pseudoElementsPlugin.isUsed();
            options.postcssPluginPseudoElementsSelectors = pseudoElementsPlugin.getSelectors();
        }
        if (epubPlugin.isEnabled()) {
            options.postcssPluginEpubEnabled = epubPlugin.isEnabled();
            options.postcssPluginEpubUsed = epubPlugin.isUsed();
            options.postcssPluginEpubFonts = epubPlugin.isFonts();
            options.postcssPluginEpubStrip = epubPlugin.isStrip();
            options.postcssPluginEpubStrict = epubPlugin.isStrict();
        }
        if (opacityPlugin.isEnabled()) {
            options.postcssPluginOpacityEnabled = opacityPlugin.isEnabled();
            options.postcssPluginOpacityUsed = opacityPlugin.isUsed();
        }
        if (vminPlugin.isEnabled()) {
            options.postcssPluginVminEnabled = vminPlugin.isEnabled();
            options.postcssPluginVminUsed = vminPlugin.isUsed();
        }
        if (colorRgbaPlugin.isEnabled()) {
            options.postcssPluginColorRgbaEnabled = colorRgbaPlugin.isEnabled();
            options.postcssPluginColorRgbaUsed = colorRgbaPlugin.isUsed();
        }
        if (cssgracePlugin.isEnabled()) {
            options.postcssPluginCssgraceEnabled = cssgracePlugin.isEnabled();
            options.postcssPluginCssgraceUsed = cssgracePlugin.isUsed();
        }
        if (willChangePlugin.isEnabled()) {
            options.postcssPluginWillChangeEnabled = willChangePlugin.isEnabled();
            options.postcssPluginWillChangeUsed = willChangePlugin.isUsed();
        }
        /*if () {

         }*/
        return options;
    }
}

export = Base;
