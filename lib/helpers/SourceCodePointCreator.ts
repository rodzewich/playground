import typeOf = require("../typeOf");
import ISourceCodePointCreator = require("./ISourceCodePointCreator");

class SourceCodePointCreator implements ISourceCodePointCreator {

    private _numberOfLinesBefore:number = 3;

    private _numberOfLinesAfter:number = 3;

    constructor(options?:{numberOfLinesBefore: number; numberOfLinesAfter: number}) {
        if (options && typeOf(options.numberOfLinesBefore) !== "undefined") {
            this.setNumberOfLinesBefore(options.numberOfLinesBefore);
        }
        if (options && typeOf(options.numberOfLinesAfter) !== "undefined") {
            this.setNumberOfLinesAfter(options.numberOfLinesAfter);
        }
    }

    protected setNumberOfLinesBefore(value:number):void {
        this._numberOfLinesBefore = value;
    }

    protected getNumberOfLinesBefore():number {
        return this._numberOfLinesBefore;
    }

    protected setNumberOfLinesAfter(value:number):void {
        this._numberOfLinesAfter = value;
    }

    protected getNumberOfLinesAfter():number {
        return this._numberOfLinesAfter;
    }

    public create(content:string, line:number, column:number):string {
        var maxChars:number = String(line + this.getNumberOfLinesAfter()).length,
            contentAsArray:string[] = content.split(/\n/).map((line:string):string => {
                return line.replace(/\r/g, "");
            });
        var needDotes: boolean = false;
        var result: string[] = [];
        var index:number;
        for (index = line - this.getNumberOfLinesBefore() + 1; index <= line; index++) {
            if (typeOf(contentAsArray[index - 1]) !== "undefined") {
                result.push(Array(maxChars - String(index).length + 2).join(" ") + String(index) + " | " + contentAsArray[index - 1]);
            }
        }
        result.push(" " + Array(maxChars + column + 3).join("-") + "^");
        for (index = line + 1; index <= line + this.getNumberOfLinesAfter(); index++) {
            if (typeOf(contentAsArray[index - 1]) !== "undefined") {
                result.push(Array(maxChars - String(index).length + 2).join(" ") + String(index) + " | " + contentAsArray[index - 1]);
            }
        }
        return result.join("\n");
    }
}

export = SourceCodePointCreator;

/*
 123 | source code text
 124 | source code text
 125 | source code text
 -------------^
 126 | source code text
 127 | source code text
 128 | source code text
 */