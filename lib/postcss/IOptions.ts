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
}

export = IOptions;
