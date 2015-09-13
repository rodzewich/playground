import typeOf = require("../typeOf");
import IWarning = require("./IWarning");

class Warning implements IWarning {

    private _text:string;

    private _plugin:string;

    private _line:number;

    private _column:number;

    constructor(options:{text: string; plugin: string; line: number; column: number;}) {
        if (options && typeOf(options.text) !== "undefined") {
            this._text = options.text;
        }
        if (options && typeOf(options.plugin) !== "undefined") {
            this._plugin = options.plugin;
        }
        if (options && typeOf(options.line) !== "undefined") {
            this._line = options.line;
        }
        if (options && typeOf(options.column) !== "undefined") {
            this._column = options.column;
        }
    }

    public toString():string {
        return null;
    }

}

export = Warning;
