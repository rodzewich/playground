import IClientBase = require("../../client/IClient");
import IResponse = require("./IResponse");

interface IClient extends IClientBase {
    daemon:string;
    useCache:boolean;
    errorsBackgroundColor:string;
    errorsTextColor:string;
    errorsBlockPadding:string;
    errorsFontSize:string;
    memoryLocation:string;
    sourcesDirectory:string;
    webRootDirectory:string;
    compile(filename:string, callback?:(errors:Error[], result:IResponse) => void): void;
    getDaemon():string;
    isCacheUsed():boolean;
    getIsCacheUsed():boolean;
    setIsCacheUsed(value:boolean):void;
    getCssErrorsBackgroundColor():string;
    setCssErrorsBackgroundColor(value:string):void;
    getCssErrorsTextColor():string;
    setCssErrorsTextColor(value:string):void;
    getCssErrorsBlockPadding():string;
    setCssErrorsBlockPadding(value:string):void;
    getCssErrorsFontSize():string;
    setCssErrorsFontSize(value:string):void;
    createCssErrors(errors:Error[]):string;
    getMemoryLocation():string;
    setMemoryLocation(value:string):void;
    getSourcesDirectory():string;
    setSourcesDirectory(value:string):void;
    getWebRootDirectory():string;
    setWebRootDirectory(value:string):void;
}

export = IClient;
