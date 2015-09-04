import IOptionsBase = require("../IOptions");

interface IOptions extends IOptionsBase {
    selectors?: string[];
}

export = IOptions;
