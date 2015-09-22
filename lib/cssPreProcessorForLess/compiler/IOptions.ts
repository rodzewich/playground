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
}

export = IOptions;
