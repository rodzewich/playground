import IOptionsBase = require("../IOptions");

interface IOptions extends IOptionsBase {
    browsers?: string[];
    cascade?: boolean;
    add?: boolean;
    remove?: boolean;
}

export = IOptions;
