import one = require("onecolor");
import {IException as IExceptionBase} from "../../exception";

export interface ICssErrorsHelper {
    getBackgroundColor():string;
    setBackgroundColor(color:string):void;
    getTextColor():string;
    setTextColor(color:string):void;
    getBlockPadding():string;
    setBlockPadding(value:string):void;
    getFontSize():string;
    setFontSize(value:string):void;
    create(errors:Error[]):string;
}

export class CssErrorsHelper implements ICssErrorsHelper {

    private _backgroundColor:string = "#ffff00";

    private _textColor:string = "#000000";

    private _blockPadding:string = "10px";

    private _fontSize:string = "13px";

    public getBackgroundColor():string {
        return this._backgroundColor;
    }

    public setBackgroundColor(color:string):void {
        this._backgroundColor = one(color).hex();
    }

    public getTextColor():string {
        return this._textColor;
    }

    public setTextColor(color:string):void {
        this._textColor = one(color).hex();
    }

    public getBlockPadding():string {
        return this._blockPadding;
    }

    public setBlockPadding(value:string):void {
        this._blockPadding = value;
    }

    public getFontSize():string {
        return this._fontSize;
    }

    public setFontSize(value:string):void {
        this._fontSize = value;
    }

    public create(exceptions:IExceptionBase[]):string {
        var property:string,
            content:string[] = [],
            bodyBefore:any = {
                "margin"           : "0 !important",
                "overflow"         : "hidden !important",
                "display"          : "block !important",
                "padding"          : this.getBlockPadding() + " !important",
                "color"            : this.getTextColor() + " !important",
                "background-color" : this.getBackgroundColor() + " !important",
                "white-space"      : "pre !important",
                "font-family"      : "'Courier New',Courier,'Lucida Sans Typewriter','Lucida Typewriter',monospace !important",
                "font-size"        : this.getFontSize() + " !important",
                "font-style"       : "normal !important",
                "font-variant"     : "normal !important",
                "font-weight"      : "400 !important",
                "word-wrap"        : "break-word !important",
                "content"          : JSON.stringify(exceptions.map(function (exception:IExceptionBase, index:number) {
                    return String(index + 1) + ". " + exception.getStack();
                }).join("\n\n")).
                    replace(/\\n/g, "\\A ")/*.
                 replace(/&/g, '&amp;').
                 replace(/</g, '&lt;').
                 replace(/>/g, '&gt;').
                 replace(/"/g, '&quot;')*/ + " !important"
                // todo: доделать реализацию
            };
        for (property in bodyBefore) {
            if (bodyBefore.hasOwnProperty(property)) {
                content.push(property + ":" + bodyBefore[property] + ";");
            }
        }
        return "body:before{" + content.join("") + "}";
    }

}
