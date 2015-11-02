import IOptionsBase = require("../../client/IOptions");

interface IOptions extends IOptionsBase {
    cacheOnly?:boolean;
}

export = IOptions;
