import IOptionsBase = require("../IOptions");

interface IOptions extends IOptionsBase {
    replace?: boolean;
    atrules?: boolean;
    html?: boolean;
    browsers?: string[];
}

export = IOptions;
