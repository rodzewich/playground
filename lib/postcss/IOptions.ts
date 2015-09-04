interface IOptions {
    postcssPluginAutoprefixerEnabled?: boolean;
    postcssPluginAutoprefixerUsed?: boolean;
    postcssPluginAutoprefixerBrowsers?: string[];
    postcssPluginAutoprefixerCascade?: boolean;
    postcssPluginAutoprefixerRemove?: boolean;
    postcssPluginAutoprefixerAdd?: boolean;
    postcssPluginPseudoElementsEnabled?: boolean;
    postcssPluginPseudoElementsUsed?: boolean;
    postcssPluginPseudoElementsSelectors?: string[];
    postcssPluginEpubEnabled?: boolean;
    postcssPluginEpubUsed?: boolean;
    postcssPluginEpubFonts?: boolean;
    postcssPluginEpubStrip?: boolean;
    postcssPluginEpubStrict?: boolean;
}

export = IOptions;
