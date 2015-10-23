import IOptionsBase = require("../../daemon/IOptions");

interface IOptions extends IOptionsBase {
    namespace?:string;
    sourceDirectory?:string;
    includeDirectories?:string[];
    useIndex?:boolean;
    indexExtensions?:string[];
    useGzip?:boolean;
    gzipMinLength?:number;
    gzipExtensions?:string[];
    gzipCompressionLevel?:number;
}

export = IOptions;
