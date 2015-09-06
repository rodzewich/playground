import IOptionsBase = require("../IOptions");

interface IOptions extends IOptionsBase {
    replace?: boolean;
    atRules?: boolean;
    html?: boolean;
    browsers?: string[];
    rootFontSize?: string;
}

export = IOptions;
