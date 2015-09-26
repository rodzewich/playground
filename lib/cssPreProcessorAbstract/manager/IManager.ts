import IBaseManager = require("../../compiler/manager/IManager");
import IResponse = require("./IResponse");

interface IManager extends IBaseManager {
    compile(filename:string, callback?:(errors:Error[], result:IResponse) => void): void;
    isBrandSpecificLogic():boolean;
    getIsBrandSpecificLogic():boolean;
    setIsBrandSpecificLogic(value:boolean):void;
    getIncludeDirectories():string[];
    setIncludeDirectories(value:string[]):void;
    isSupportLanguages():boolean;
    getIsSupportLanguages():boolean;
    setIsSupportLanguages(value:boolean):void;
    isThrowErrors():boolean;
    getIsThrowErrors():boolean;
    setIsThrowErrors(value:boolean):void;
    isUsedPostProcessing():boolean;
    getIsUsedPostProcessing():boolean;
    setIsUsedPostProcessing(value:boolean):void;
}

export = IManager;
