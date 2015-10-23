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
    setNamespace(namespace:string):void;
    getMetadataNamespace():string;
    getBinaryNamespace():string;
    getGzipNamespace():string;
    getIncludeDirectories():string[];
    setIncludeDirectories(directories:string[]):void;
    getSourcesDirectory():string;
    setSourcesDirectory(directory:string):void;
    isUseIndex():boolean;
    getIsUseIndex():boolean;
    setIsUseIndex(value:boolean):void;
    getIndexExtensions():string[];
    setIndexExtensions(extensions:string[]):void;
    isUseGzip():boolean;
    getIsUseGzip():boolean;
    setIsUseGzip(value:boolean):void;
    getGzipMinLength():number;
    setGzipMinLength(length:number):void;
    getGzipExtensions():string[];
    setGzipExtensions(extensions:string[]):void;
    getGzipCompressionLevel():number;
    setGzipCompressionLevel(level:number):void;
    ping(callback?:(errors:IException[]) => void):void;
    stop(callback?:(errors:IException[]) => void):void;
    getContent(filename:string, callback?:(errors:IException[], response:IResponse) => void):void;
}

export = IClient;
