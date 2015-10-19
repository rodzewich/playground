import ICompilerBase = require("../../compiler/compiler/ICompiler");
import IMemory = require("../../memory/client/IClient");

interface ICompiler extends ICompilerBase {
    setMemory(value:IMemory):void;
    getMemory():IMemory;
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

export = ICompiler;
