import IRequestBase = require("../../compiler/client/IRequest");

interface IRequest extends IRequestBase {
    includeDirectories:string[];
    brandSpecificLogic:boolean;
    supportLanguages:boolean;
    throwErrors:boolean;
    usedPostProcessing:boolean;
}

export = IRequest;
