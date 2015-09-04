import IOptions = require("./IOptions");
import typeOf = require("../typeOf");
import IPostcssAutoprefixerPlugin = require("./plugins/fallbacks/autoprefixer/IPlugin");
import PostcssAutoprefixerPlugin = require("./plugins/fallbacks/autoprefixer/Plugin");
import IPostcssPseudoElementsPlugin = require("./plugins/fallbacks/pseudoElements/IPlugin");
import PostcssPseudoElementsPlugin = require("./plugins/fallbacks/pseudoElements/Plugin");

class Base {

    private _autoprefixerPlugin:IPostcssAutoprefixerPlugin = new PostcssAutoprefixerPlugin();

    private _pseudoElementsPlugin:IPostcssPseudoElementsPlugin = new PostcssPseudoElementsPlugin();

    protected getAutoprefixerPlugin():IPostcssAutoprefixerPlugin {
        return this._autoprefixerPlugin;
    }

    protected getPseudoElementsPlugin():IPostcssPseudoElementsPlugin {
        return this._pseudoElementsPlugin;
    }

    constructor(options?:IOptions) {
        this.setOptions(options);
    }

    public setOptions(options:IOptions):void {
        var autoprefixerPlugin:IPostcssAutoprefixerPlugin = this.getAutoprefixerPlugin(),
            pseudoElementsPlugin:IPostcssPseudoElementsPlugin = this.getPseudoElementsPlugin();
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
    }

    public getOptions():IOptions {
        var autoprefixerPlugin:IPostcssAutoprefixerPlugin = this.getAutoprefixerPlugin(),
            pseudoElementsPlugin:IPostcssPseudoElementsPlugin = this.getPseudoElementsPlugin(),
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
        return options;
    }
}

export = Base;
