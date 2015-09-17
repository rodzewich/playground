import IBaseRequest = require("../../cssPreProcessorAbstract/client/IRequest");

interface IRequest extends IBaseRequest {
    includeDirectories: string[];
}

export = IRequest;
