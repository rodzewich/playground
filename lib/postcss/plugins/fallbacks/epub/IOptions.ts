import IOptionsBase = require("../IOptions");

interface IOptions extends IOptionsBase {
    fonts?: boolean;
    strip?: boolean;
    strict?: boolean;
}

export = IOptions;
