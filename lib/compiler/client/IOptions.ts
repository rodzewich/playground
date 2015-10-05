import IOptionsBase = require("../../client/IOptions");

interface IOptions extends IOptionsBase {
    sourcesDirectory:string;
    memoryLocation:string;
    useCache:boolean;
    errorsBackgroundColor?:string;
    errorsTextColor?:string;
    errorsBlockPadding?:string;
    errorsFontSize?:string;
    webRootDirectory:string;
}

export = IOptions;
