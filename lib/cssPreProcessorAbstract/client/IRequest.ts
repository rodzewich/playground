import IBaseRequest = require("../../compiler/client/IRequest");

interface IRequest extends IBaseRequest {
    includeDirectories: string[];
}

export = IRequest;
