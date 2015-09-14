import typeOf = require("../typeOf");
import IWarning = require("./IWarning");

class Warning implements IWarning {

    private _text:string;

    private _plugin:string;

    private _filename:string;

    private _line:number;

    private _column:number;

    constructor(options:{text: string; plugin: string; filename: string; content: string; line: number; column: number;}) {
        if (options && typeOf(options.text) !== "undefined") {
            this._text = options.text;
        }
        if (options && typeOf(options.plugin) !== "undefined") {
            this._plugin = options.plugin;
        }
        if (options && typeOf(options.filename) !== "undefined") {
            this._filename = options.filename;
        }
        if (options && typeOf(options.line) !== "undefined") {
            this._line = options.line;
        }
        if (options && typeOf(options.column) !== "undefined") {
            this._column = options.column;
        }
    }

    public getText():string {
        return this._text;
    }

    public getPlugin():string {
        return this._plugin;
    }

    public getFilename():string {
        return this._filename;
    }

    public getLine():number {
        return this._line;
    }

    public getColumn():number {
        return this._column;
    }

    public toString():string {
        var message:string = ["Warning:", this.getText(),
            "in", [JSON.stringify(this.getFilename()), "(plugin: ", JSON.stringify(this.getPlugin()), ")"].join(""),
            "on line", String(this.getLine()),
            ", column", String(this.getColumn())
        ].join(" ");
    }

}

export = Warning;
