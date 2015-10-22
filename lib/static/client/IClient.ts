import IClientBase = require("../../client/IClient");
import IResponse   = require("../IResponse");
import IException  = require("../exception/IException");

interface IClient extends IClientBase {
    namespace:string;
    metadataNamespace:string;
    binaryNamespace:string;
    gzipNamespace:string;
    sourceDirectory:string;
    includeDirectories:string[];
    useIndex:boolean;
    indexExtensions:string[];
    useGzip:boolean;
    gzipMinLength:number;
    gzipExtensions:string[];
    gzipCompressionLevel:number;
    getNamespace():string;
    setNamespace(namespace:string):IClient;
    getMetadataNamespace():string;
    getBinaryNamespace():string;
    getGzipNamespace():string;
    getIncludeDirectories():string[];
    setIncludeDirectories(directories:string[]):IClient;
    getSourcesDirectory():string;
    setSourcesDirectory(directory:string):IClient;
    isUseIndex():boolean;
    getIsUseIndex():boolean;
    setIsUseIndex(value:boolean):IClient;
    getIndexExtensions():string[];
    setIndexExtensions(extensions:string[]):IClient;
    isUseGzip():boolean;
    getIsUseGzip():boolean;
    setIsUseGzip(value:boolean):IClient;
    getGzipMinLength():number;
    setGzipMinLength(length:number):IClient;
    getGzipExtensions():string[];
    setGzipExtensions(extensions:string[]):IClient;
    getGzipCompressionLevel():number;
    setGzipCompressionLevel(level:number):IClient;
    ping(callback?:(errors:IException[]) => void):IClient;
    stop(callback?:(errors:IException[]) => void):IClient;
    getContent(filename:string, callback?:(errors:IException[], response:IResponse) => void):IClient;
}

export = IClient;
