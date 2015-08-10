/// <reference path="../ILoader.ts" />
/// <reference path="../IOptions.ts" />
/// <reference path="../transport/ITransport.ts" />
/// <reference path="../transport/IOptions.ts" />
/// <reference path="../builder/IFactory.ts" />

import ILoader = require("../ILoader");
import ITransport = require("../transport/ITransport");
import ILoaderOptions = require("../IOptions");
import ITransportOptions = require("../transport/IOptions");
import IBuilderFactory = require("../builder/IFactory");

interface IFactory extends IBuilderFactory {
    createTemplatesLoader(): ILoader;
    createScriptsLoader(): ILoader;
    createStylesLoader(): ILoader;
    getTemplatesLoader(): ILoader;
    getScriptsLoader(): ILoader;
    getStylesLoader(): ILoader;
    createTemplatesLoaderOptions(): ILoaderOptions;
    createScriptsLoaderOptions(): ILoaderOptions;
    createStylesLoaderOptions(): ILoaderOptions;
    getTemplatesLoaderOptions(): ILoaderOptions;
    getScriptsLoaderOptions(): ILoaderOptions;
    getStylesLoaderOptions(): ILoaderOptions;
    createTemplatesTransport(): ITransport;
    createScriptsTransport(): ITransport;
    createStylesTransport(): ITransport;
    getTemplatesTransport(): ITransport;
    getScriptsTransport(): ITransport;
    getStylesTransport(): ITransport;
    createTemplatesTransportOptions(): ITransportOptions;
    createScriptsTransportOptions(): ITransportOptions;
    createStylesTransportOptions(): ITransportOptions;
    getTemplatesTransportOptions(): ITransportOptions;
    getScriptsTransportOptions(): ITransportOptions;
    getStylesTransportOptions(): ITransportOptions;
}

export = IFactory;
