import IOptionsBase = require("../../daemon/IOptions");

interface IOptions extends IOptionsBase {
    charset?:string;
    memoryNamespace?:string;
    metadataNamespace?:string;
    binaryNamespace?:string;
    gzipNamespace?:string;
    lockNamespace?:string;
    sourcesDirectory?:string;
    includeDirectories?:string[];
    useIndex?:boolean;
    indexExtensions?:string[];
    useGzip?:boolean;
    gzipMinLength?:number;
    gzipExtensions?:string[];
    gzipCompressionLevel?:number;
    memoryLocation?:string;
    metadataLocation?:string;
    binaryLocation?:string;
    gzipLocation?:string;
    lockLocation?:string;
    memoryTimeout?:number;
    metadataTimeout?:number;
    binaryTimeout?:number;
    gzipTimeout?:number;
    lockTimeout?:number;
}

export = IOptions;
