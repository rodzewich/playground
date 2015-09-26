import IBaseRequest = require("../../compiler/client/IRequest");

interface IRequest extends IBaseRequest {
    includeDirectories:string[];
    brandSpecificLogic:boolean;
    supportLanguages:boolean;
    throwErrors:boolean;
    usedPostProcessing:boolean;
}

export = IRequest;
