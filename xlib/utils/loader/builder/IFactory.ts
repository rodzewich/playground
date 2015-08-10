/// <reference path="./IBuilder.ts" />
/// <reference path="./IOptions.ts" />

import IBuilder = require("./IBuilder");
import IOptions = require("./IOptions");

interface IFactory {
    createTemplatesBuilder(): IBuilder;
    createScriptsBuilder(): IBuilder;
    createStylesBuilder(): IBuilder;
    getTemplatesBuilder(): IBuilder;
    getScriptsBuilder(): IBuilder;
    getStylesBuilder(): IBuilder;
    createTemplatesBuilderOptions(): IOptions;
    createScriptsBuilderOptions(): IOptions;
    createStylesBuilderOptions(): IOptions;
    getTemplatesBuilderOptions(): IOptions;
    getScriptsBuilderOptions(): IOptions;
    getStylesBuilderOptions(): IOptions;
}

export = IFactory;
