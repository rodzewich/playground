import IOptionsBase = require("../../css/compiler/IOptions");

interface IOptions extends IOptionsBase {
    pluginBootstrapUsed?:boolean;
    pluginCardinalUsed?:boolean;
    pluginFlexboxgridUsed?:boolean;
    pluginIonicUsed?:boolean;
    pluginLesshatUsed?:boolean;
    pluginNpmImportUsed?:boolean;
    pluginNpmImportPrefix?:string;
    pluginSkeletonUsed?:boolean;
    pluginBowerResolveUsed?:boolean;
    pluginAdvancedColorFunctionsUsed?:boolean;
    pluginCubehelixUsed?:boolean;
    pluginListsUsed?:boolean;
    pluginAutoprefixUsed?:boolean;
    pluginAutoprefixBrowsers?:string[];
    pluginCsscombUsed?:boolean;
    pluginCleanCssUsed?:boolean;
    pluginCssWringUsed?:boolean;
    pluginCssWringPreserveHacks?:boolean;
    pluginCssWringRemoveAllComments?:boolean;
    pluginCssFlipUsed?:boolean;

    pluginsPriorities?:string[];
    globalVariables?:any;
    modifyVariables?:any;
}

export = IOptions;
