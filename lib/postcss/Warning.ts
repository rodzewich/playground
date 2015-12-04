import {isDefined} from "../utils/common";
import IWarning = require("./IWarning");
import SourceCodePointCreator = require("../helpers/SourceCodePointCreator");
import ISourceCodePointCreator = require("../helpers/ISourceCodePointCreator");

class Warning implements IWarning {

    private _text:string;

    private _plugin:string;

    private _filename:string;

    private _content:string;

    private _line:number;

    private _column:number;

    constructor(options:{text: string; plugin: string; filename: string; content: string; line: number; column: number;}) {
        if (options && isDefined(options.text)) {
            this._text = options.text;
        }
        if (options && isDefined(options.plugin)) {
            this._plugin = options.plugin;
        }
        if (options && isDefined(options.filename)) {
            this._filename = options.filename;
        }
        if (options && isDefined(options.content)) {
            this._content = options.content;
        }
        if (options && isDefined(options.line)) {
            this._line = options.line;
        }
        if (options && isDefined(options.column)) {
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

    public getContent():string {
        return this._content;
    }

    public getLine():number {
        return this._line;
    }

    public getColumn():number {
        return this._column;
    }

    public toString():string {
        var creator:ISourceCodePointCreator = new SourceCodePointCreator(), // todo: use parameters
            message:string = [
                "Warning:", this.getText(),
                "in", [this.getFilename(), "(", String(this.getLine()), ":", String(this.getColumn()), ")"].join(""),
                "from", String(this.getPlugin())
            ].join(" "),
            code:string = creator.create(this.getContent(), this.getLine(), this.getColumn());
        return [message, code].join("\n");
    }

}

export = Warning;
