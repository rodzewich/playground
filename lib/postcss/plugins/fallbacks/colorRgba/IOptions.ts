import IOptionsBase = require("../IOptions");

interface IOptions extends IOptionsBase {
    properties?: string[];
}

export = IOptions;
