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
    postcssPluginOpacityEnabled?: boolean;
    postcssPluginOpacityUsed?: boolean;
    postcssPluginVminEnabled?: boolean;
    postcssPluginVminUsed?: boolean;
    postcssPluginColorRgbaEnabled?: boolean;
    postcssPluginColorRgbaUsed?: boolean;
    postcssPluginCssgraceEnabled?: boolean;
    postcssPluginCssgraceUsed?: boolean;
    postcssPluginWillChangeEnabled?: boolean;
    postcssPluginWillChangeUsed?: boolean;
}

export = IOptions;
