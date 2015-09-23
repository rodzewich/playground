import IBaseOptions = require("../../cssPreProcessorAbstract/compiler/IOptions");

interface IOptions extends IBaseOptions {
    pluginBootstrapUsed?:boolean;
    pluginCardinalUsed?:boolean;
    pluginFlexboxgridUsed?:boolean;
    pluginIonicUsed?:boolean;
    pluginLesshatUsed?:boolean;
    pluginNpmImportUsed?:boolean;
    pluginNpmImportPrefix?:boolean;
    pluginSkeletonUsed?:boolean;
    pluginBowerResolveUsed?:boolean;
    pluginAdvancedColorFunctionsUsed?:boolean;
    pluginCubehelixUsed?:boolean;
    pluginListsUsed?:boolean;
    pluginAutoprefixUsed?:boolean;
    pluginAutoprefixBrowsers?:string[];
    pluginCsscombUsed?:boolean;
    pluginCsscombConfig?:string;
    pluginCleanCssUsed?:boolean;
    pluginCssWringUsed?:boolean;
    pluginCssWringPreserveHacks?:boolean;
    pluginCssWringRemoveAllComments?:boolean;
    pluginCssFlipUsed?:boolean;

    pluginsPriorities?:string[];
}

export = IOptions;
