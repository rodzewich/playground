import IOptions = require("./IOptions");
import typeOf = require("../typeOf");
import IPostcssAutoprefixerPlugin = require("./plugins/fallbacks/autoprefixer/IPlugin");
import PostcssAutoprefixerPlugin = require("./plugins/fallbacks/autoprefixer/Plugin");
import IPostcssPseudoElementsPlugin = require("./plugins/fallbacks/pseudoElements/IPlugin");
import PostcssPseudoElementsPlugin = require("./plugins/fallbacks/pseudoElements/Plugin");
import IPostcssEpubPlugin = require("./plugins/fallbacks/epub/IPlugin");
import PostcssEpubPlugin = require("./plugins/fallbacks/epub/Plugin");

class Base {

    private _autoprefixerPlugin:IPostcssAutoprefixerPlugin = new PostcssAutoprefixerPlugin();

    private _pseudoElementsPlugin:IPostcssPseudoElementsPlugin = new PostcssPseudoElementsPlugin();

    private _epubElementPlugin:IPostcssEpubPlugin = new PostcssEpubPlugin();

    protected getAutoprefixerPlugin():IPostcssAutoprefixerPlugin {
        return this._autoprefixerPlugin;
    }

    protected getPseudoElementsPlugin():IPostcssPseudoElementsPlugin {
        return this._pseudoElementsPlugin;
    }

    protected getEpubPlugin():IPostcssEpubPlugin {
        return this._epubElementPlugin;
    }

    constructor(options?:IOptions) {
        var autoprefixerPlugin:IPostcssAutoprefixerPlugin = this.getAutoprefixerPlugin(),
            pseudoElementsPlugin:IPostcssPseudoElementsPlugin = this.getPseudoElementsPlugin(),
            epubPlugin:IPostcssEpubPlugin = this.getEpubPlugin();
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
    }

    public getOptions():IOptions {
        var autoprefixerPlugin:IPostcssAutoprefixerPlugin = this.getAutoprefixerPlugin(),
            pseudoElementsPlugin:IPostcssPseudoElementsPlugin = this.getPseudoElementsPlugin(),
            epubPlugin:IPostcssEpubPlugin = this.getEpubPlugin(),
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
        return options;
    }
}

export = Base;
