interface IRequest {
    namespace:string;
    metadataNamespace:string;
    binaryNamespace:string;
    gzipNamespace:string;
    sourceDirectory:string;
    includeDirectories:string[],
    useIndex:boolean;
    indexExtensions:string[];
    useGzip:boolean;
    gzipMinLength:number;
    gzipExtensions:string[];
    gzipCompressionLevel:number;
}

export = IRequest;
