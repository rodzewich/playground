import IOptionsBase = require("../../client/IOptions");

interface IOptions extends IOptionsBase {
    namespace?:string;
}

export = IOptions;
