interface ICssErrorsHelper {
    getBackgroundColor():string;
    setBackgroundColor(value:string):void;
    getTextColor():string;
    setTextColor(value:string):void;
    getBlockPadding():string;
    setBlockPadding(value:string):void;
    getFontSize():string;
    setFontSize(value:string):void;
    create(errors:Error[]):string;
}

export = ICssErrorsHelper;
