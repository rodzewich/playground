import IOptions = require("./IOptions");
import typeOf = require("../typeOf");
import IPostcssAutoprefixerPlugin = require("./plugins/fallbacks/autoprefixer/IPlugin");
import PostcssAutoprefixerPlugin = require("./plugins/fallbacks/autoprefixer/Plugin");

class Base {

    private _autoprefixerPlugin:IPostcssAutoprefixerPlugin = new PostcssAutoprefixerPlugin();

    protected getAutoprefixerPlugin():IPostcssAutoprefixerPlugin {
        return this._autoprefixerPlugin;
    }

    constructor(options?:IOptions) {
        this.setOptions(options);
    }

    public setOptions(value:IOptions):void {
        var autoprefixerPlugin:IPostcssAutoprefixerPlugin = this.getAutoprefixerPlugin();
        if (value && typeOf(value.postcssPluginAutoprefixerEnabled) !== "undefined") {
            autoprefixerPlugin.setIsEnabled(value.postcssPluginAutoprefixerEnabled);
        }
        if (value && typeOf(value.postcssPluginAutoprefixerUsed) !== "undefined") {
            autoprefixerPlugin.setIsUsed(value.postcssPluginAutoprefixerUsed);
        }
        if (value && typeOf(value.postcssPluginAutoprefixerBrowsers) !== "undefined") {
            autoprefixerPlugin.setBrowsers(value.postcssPluginAutoprefixerBrowsers);
        }
        if (value && typeOf(value.postcssPluginAutoprefixerCascade) !== "undefined") {
            autoprefixerPlugin.setIsCascade(value.postcssPluginAutoprefixerCascade);
        }
        if (value && typeOf(value.postcssPluginAutoprefixerRemove) !== "undefined") {
            autoprefixerPlugin.setIsRemove(value.postcssPluginAutoprefixerRemove);
        }
        if (value && typeOf(value.postcssPluginAutoprefixerAdd) !== "undefined") {
            autoprefixerPlugin.setIsAdd(value.postcssPluginAutoprefixerAdd);
        }
    }

    public getOptions():IOptions {
        var autoprefixerPlugin:IPostcssAutoprefixerPlugin = this.getAutoprefixerPlugin();
        return {
            postcssPluginAutoprefixerEnabled: autoprefixerPlugin.isEnabled(),
            postcssPluginAutoprefixerUsed: autoprefixerPlugin.isUsed(),
            postcssPluginAutoprefixerBrowsers: autoprefixerPlugin.getBrowsers(),
            postcssPluginAutoprefixerCascade: autoprefixerPlugin.isCascade(),
            postcssPluginAutoprefixerRemove: autoprefixerPlugin.isRemove(),
            postcssPluginAutoprefixerAdd: autoprefixerPlugin.isAdd(),
        };
    }
}

export = Base;
