import IOptionsBase = require("../compiler/IOptions");

interface IOptions extends IOptionsBase {
    sourcesDirectory: string;
    scriptsTarget?: string;
    errorBackgroundColor?: string;
    errorTextColor?: string;
    errorBlockPadding?: string;
    errorFontSize?: string;
}
