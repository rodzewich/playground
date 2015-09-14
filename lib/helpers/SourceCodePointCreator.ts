// todo: 1. сокращать тексты по горизонтали, обрезать большие пробельные пространства!
// todo: 2. сокращать тексты по горизонтали, обрезать текст слева и справа, так чтобы он помещался в ширину консоли или 80 знаков!

import isDefined = require("../isDefined");
import ISourceCodePointCreator = require("./ISourceCodePointCreator");

class SourceCodePointCreator implements ISourceCodePointCreator {

    private _numberOfLinesBefore:number = 3;

    private _numberOfLinesAfter:number = 3;

    constructor(options?:{numberOfLinesBefore: number; numberOfLinesAfter: number}) {
        if (options && isDefined(options.numberOfLinesBefore)) {
            this.setNumberOfLinesBefore(options.numberOfLinesBefore);
        }
        if (options && isDefined(options.numberOfLinesAfter)) {
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
        var contentAsArray:string[] = content.split(/\n/).map((line:string):string => {
                return line.replace(/\r/g, "");
            }),
            maxChars:number   = String(line + this.getNumberOfLinesAfter()).length,
            needDotes:boolean = false,
            result:string[]   = [],
            index:number;
        for (index = line - this.getNumberOfLinesBefore() + 1; index <= line + this.getNumberOfLinesAfter(); index++) {
            // todo: implement it
        }
        for (index = line - this.getNumberOfLinesBefore() + 1; index <= line; index++) {
            if (isDefined(contentAsArray[index - 1])) {
                result.push(Array(maxChars - String(index).length + 2).join(" ") + String(index) + " | " + contentAsArray[index - 1]);
            }
        }
        result.push(" " + Array(maxChars + column + 3).join("-") + "^");
        for (index = line + 1; index <= line + this.getNumberOfLinesAfter(); index++) {
            if (isDefined(contentAsArray[index - 1])) {
                result.push(Array(maxChars - String(index).length + 2).join(" ") + String(index) + " | " + contentAsArray[index - 1]);
            }
        }
        return result.join("\n");
    }
}

export = SourceCodePointCreator;
