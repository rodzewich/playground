import IBaseOptions = require("../../client/IOptions");

interface IOptions extends IBaseOptions {
    namespace?: string;
}

export = IOptions;
