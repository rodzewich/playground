interface IPostcssEpubHelper {
    isUse():boolean;
    getUse():boolean;
    setUse(value:boolean):void;
    isFonts():boolean;
    getFonts():boolean;
    setFonts(value:boolean):void;
    isStrip():boolean;
    getStrip():boolean;
    setStrip(value:boolean):void;
    isStrict():boolean;
    getStrict():boolean;
    setStrict(value:boolean):void;
    getInstance(): any;
}

export = IPostcssEpubHelper;
