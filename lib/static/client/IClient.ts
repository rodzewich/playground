import IClientBase  = require("../../client/IClient");

// todo: use index
// todo: use index extensions
// todo: use gzip
// todo: use gzip parameters

interface IClient extends IClientBase {
    namespace:string;
    metadataNamespace:string;
    binaryNamespace:string;
    gzipNamespace:string;
    sourceDirectory:string;
    includeDirectories:string[];
    getNamespace():string;
    setNamespace(namespace:string):void;
    getMetadataNamespace():string;
    getBinaryNamespace():string;
    getGzipNamespace():string;
    getIncludeDirectories():string[];
    setIncludeDirectories(directories:string[]):void;
    getSourcesDirectory():string;
    setSourcesDirectory(directory:string):void;
    getContent(filename:string, callback?:(errors:IException[], response:string) => void):void;
}

export = IClient;
