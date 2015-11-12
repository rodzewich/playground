import IOptions = require("./IOptions");
import {isDefined} from "../utils";
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

    private _autoprefixerPlugin: IPostcssAutoprefixerPlugin = new PostcssAutoprefixerPlugin();

    private _pseudoElementsPlugin: IPostcssPseudoElementsPlugin = new PostcssPseudoElementsPlugin();

    private _epubElementPlugin: IPostcssEpubPlugin = new PostcssEpubPlugin();

    private _opacityPlugin: IPostcssOpacityPlugin = new PostcssOpacityPlugin();

    private _vminPlugin: IPostcssVminPlugin = new PostcssVminPlugin();

    private _colorRgbaPlugin: IPostcssColorRgbaPlugin = new PostcssColorRgbaPlugin();

    private _cssgracePlugin: IPostcssCssgracePlugin = new PostcssCssgracePlugin();

    private _willChangePlugin: IPostcssWillChangePlugin = new PostcssWillChangePlugin();

    private _pixremPlugin: IPostcssPixremPlugin = new PostcssPixremPlugin();

    private _bemLinterPlugin: IPostcssBemLinterPlugin = new PostcssBemLinterPlugin();

    constructor(options?: IOptions) {
        var plugins: IPlugin[]                                 = this.getPlugins(),
            autoprefixerPlugin: IPostcssAutoprefixerPlugin     = this.getAutoprefixerPlugin(),
            pseudoElementsPlugin: IPostcssPseudoElementsPlugin = this.getPseudoElementsPlugin(),
            epubPlugin: IPostcssEpubPlugin                     = this.getEpubPlugin(),
            opacityPlugin: IPostcssOpacityPlugin               = this.getOpacityPlugin(),
            vminPlugin: IPostcssVminPlugin                     = this.getVminPlugin(),
            colorRgbaPlugin: IPostcssVminPlugin                = this.getColorRgbaPlugin(),
            cssgracePlugin: IPostcssCssgracePlugin             = this.getCssgracePlugin(),
            willChangePlugin: IPostcssWillChangePlugin         = this.getWillChangePlugin();
        if (options && isDefined(options.postcssPluginAutoprefixerEnabled)) {
            autoprefixerPlugin.setIsEnabled(options.postcssPluginAutoprefixerEnabled);
        }
        if (options && isDefined(options.postcssPluginAutoprefixerUsed)) {
            autoprefixerPlugin.setIsUsed(options.postcssPluginAutoprefixerUsed);
        }
        if (options && isDefined(options.postcssPluginAutoprefixerBrowsers)) {
            autoprefixerPlugin.setBrowsers(options.postcssPluginAutoprefixerBrowsers);
        }
        if (options && isDefined(options.postcssPluginAutoprefixerCascade)) {
            autoprefixerPlugin.setIsCascade(options.postcssPluginAutoprefixerCascade);
        }
        if (options && isDefined(options.postcssPluginAutoprefixerRemove)) {
            autoprefixerPlugin.setIsRemove(options.postcssPluginAutoprefixerRemove);
        }
        if (options && isDefined(options.postcssPluginAutoprefixerAdd)) {
            autoprefixerPlugin.setIsAdd(options.postcssPluginAutoprefixerAdd);
        }
        if (options && isDefined(options.postcssPluginPseudoElementsEnabled)) {
            pseudoElementsPlugin.setIsEnabled(options.postcssPluginPseudoElementsEnabled);
        }
        if (options && isDefined(options.postcssPluginPseudoElementsUsed)) {
            pseudoElementsPlugin.setIsUsed(options.postcssPluginPseudoElementsUsed);
        }
        if (options && isDefined(options.postcssPluginPseudoElementsSelectors)) {
            pseudoElementsPlugin.setSelectors(options.postcssPluginPseudoElementsSelectors);
        }
        if (options && isDefined(options.postcssPluginEpubEnabled)) {
            epubPlugin.setIsEnabled(options.postcssPluginEpubEnabled);
        }
        if (options && isDefined(options.postcssPluginEpubUsed)) {
            epubPlugin.setIsUsed(options.postcssPluginEpubUsed);
        } else {
            epubPlugin.setIsUsed(true);
        }
        if (options && isDefined(options.postcssPluginEpubFonts)) {
            epubPlugin.setIsFonts(options.postcssPluginEpubFonts);
        }
        if (options && isDefined(options.postcssPluginEpubStrip)) {
            epubPlugin.setIsStrip(options.postcssPluginEpubStrip);
        }
        if (options && isDefined(options.postcssPluginEpubStrict)) {
            epubPlugin.setIsStrict(options.postcssPluginEpubStrict);
        }
        if (options && isDefined(options.postcssPluginOpacityEnabled)) {
            opacityPlugin.setIsEnabled(options.postcssPluginOpacityEnabled);
        }
        if (options && isDefined(options.postcssPluginOpacityUsed)) {
            opacityPlugin.setIsUsed(options.postcssPluginOpacityUsed);
        }
        if (options && isDefined(options.postcssPluginVminEnabled)) {
            vminPlugin.setIsEnabled(options.postcssPluginVminEnabled);
        }
        if (options && isDefined(options.postcssPluginVminUsed)) {
            vminPlugin.setIsUsed(options.postcssPluginVminUsed);
        }
        if (options && isDefined(options.postcssPluginColorRgbaEnabled)) {
            colorRgbaPlugin.setIsEnabled(options.postcssPluginColorRgbaEnabled);
        }
        if (options && isDefined(options.postcssPluginColorRgbaUsed)) {
            colorRgbaPlugin.setIsUsed(options.postcssPluginColorRgbaUsed);
        }
        if (options && isDefined(options.postcssPluginCssgraceEnabled)) {
            cssgracePlugin.setIsEnabled(options.postcssPluginCssgraceEnabled);
        }
        if (options && isDefined(options.postcssPluginCssgraceUsed)) {
            cssgracePlugin.setIsUsed(options.postcssPluginCssgraceUsed);
        }
        if (options && isDefined(options.postcssPluginWillChangeEnabled)) {
            willChangePlugin.setIsEnabled(options.postcssPluginWillChangeEnabled);
        }
        if (options && isDefined(options.postcssPluginWillChangeUsed)) {
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

    protected getPlugins(): IPlugin[] {
        return <IPlugin[]>[];
    }

    protected getAutoprefixerPlugin(): IPostcssAutoprefixerPlugin {
        return this._autoprefixerPlugin;
    }

    protected getPseudoElementsPlugin(): IPostcssPseudoElementsPlugin {
        return this._pseudoElementsPlugin;
    }

    protected getEpubPlugin(): IPostcssEpubPlugin {
        return this._epubElementPlugin;
    }

    protected getOpacityPlugin(): IPostcssOpacityPlugin {
        return this._opacityPlugin;
    }

    protected getVminPlugin(): IPostcssVminPlugin {
        return this._vminPlugin;
    }

    protected getColorRgbaPlugin(): IPostcssColorRgbaPlugin {
        return this._colorRgbaPlugin;
    }

    protected getCssgracePlugin(): IPostcssCssgracePlugin {
        return this._cssgracePlugin;
    }

    protected getWillChangePlugin(): IPostcssWillChangePlugin {
        return this._willChangePlugin;
    }

    protected getPixremPlugin(): IPostcssPixremPlugin {
        return this._pixremPlugin;
    }

    protected getBemLinterPlugin(): IPostcssBemLinterPlugin {
        return this._bemLinterPlugin;
    }

    public getOptions(): IOptions {
        var autoprefixerPlugin: IPostcssAutoprefixerPlugin     = this.getAutoprefixerPlugin(),
            pseudoElementsPlugin: IPostcssPseudoElementsPlugin = this.getPseudoElementsPlugin(),
            epubPlugin: IPostcssEpubPlugin                     = this.getEpubPlugin(),
            opacityPlugin: IPostcssOpacityPlugin               = this.getOpacityPlugin(),
            vminPlugin: IPostcssVminPlugin                     = this.getVminPlugin(),
            colorRgbaPlugin: IPostcssVminPlugin                = this.getColorRgbaPlugin(),
            cssgracePlugin: IPostcssCssgracePlugin             = this.getCssgracePlugin(),
            willChangePlugin: IPostcssWillChangePlugin         = this.getWillChangePlugin(),
            pixremPlugin: IPostcssPixremPlugin                 = this.getPixremPlugin(),
            options: IOptions                                  = {};
        if (autoprefixerPlugin.isEnabled()) {
            options.postcssPluginAutoprefixerEnabled  = autoprefixerPlugin.isEnabled();
            options.postcssPluginAutoprefixerUsed     = autoprefixerPlugin.isUsed();
            options.postcssPluginAutoprefixerBrowsers = autoprefixerPlugin.getBrowsers();
            options.postcssPluginAutoprefixerCascade  = autoprefixerPlugin.isCascade();
            options.postcssPluginAutoprefixerRemove   = autoprefixerPlugin.isRemove();
            options.postcssPluginAutoprefixerAdd      = autoprefixerPlugin.isAdd();
        }
        if (pseudoElementsPlugin.isEnabled()) {
            options.postcssPluginPseudoElementsEnabled   = pseudoElementsPlugin.isEnabled();
            options.postcssPluginPseudoElementsUsed      = pseudoElementsPlugin.isUsed();
            options.postcssPluginPseudoElementsSelectors = pseudoElementsPlugin.getSelectors();
        }
        if (epubPlugin.isEnabled()) {
            options.postcssPluginEpubEnabled = epubPlugin.isEnabled();
            options.postcssPluginEpubUsed    = epubPlugin.isUsed();
            options.postcssPluginEpubFonts   = epubPlugin.isFonts();
            options.postcssPluginEpubStrip   = epubPlugin.isStrip();
            options.postcssPluginEpubStrict  = epubPlugin.isStrict();
        }
        if (opacityPlugin.isEnabled()) {
            options.postcssPluginOpacityEnabled = opacityPlugin.isEnabled();
            options.postcssPluginOpacityUsed    = opacityPlugin.isUsed();
        }
        if (vminPlugin.isEnabled()) {
            options.postcssPluginVminEnabled = vminPlugin.isEnabled();
            options.postcssPluginVminUsed    = vminPlugin.isUsed();
        }
        if (colorRgbaPlugin.isEnabled()) {
            options.postcssPluginColorRgbaEnabled = colorRgbaPlugin.isEnabled();
            options.postcssPluginColorRgbaUsed    = colorRgbaPlugin.isUsed();
        }
        if (cssgracePlugin.isEnabled()) {
            options.postcssPluginCssgraceEnabled = cssgracePlugin.isEnabled();
            options.postcssPluginCssgraceUsed    = cssgracePlugin.isUsed();
        }
        if (willChangePlugin.isEnabled()) {
            options.postcssPluginWillChangeEnabled = willChangePlugin.isEnabled();
            options.postcssPluginWillChangeUsed    = willChangePlugin.isUsed();
        }
        /*if () {

         }*/
        return options;
    }
}

export = Base;
