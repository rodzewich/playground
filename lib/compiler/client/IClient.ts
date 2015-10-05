import IBaseClient = require("../../client/IClient");
import IResponse = require("./IResponse");

interface IClient extends IBaseClient {
    errorsBackgroundColor:string;
    errorsTextColor:string;
    errorsBlockPadding:string;
    errorsFontSize:string;
    compile(filename:string, callback?:(errors:Error[], result:IResponse) => void): void;
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

}

export = IClient;
