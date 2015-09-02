interface IPostcssAutoprefixerHelper {
    isUse():boolean;
    getUse():boolean;
    setUse(value:boolean):void;
    getBrowsers():string[];
    setBrowsers(value:string[]):void;
    isCascade():boolean;
    getCascade():boolean;
    setCascade(value:boolean):void;
    isAdd():boolean;
    getAdd():boolean;
    setAdd(value:boolean):void;
    isRemove():boolean;
    getRemove():boolean;
    setRemove(value:boolean):void;
    getInstance():any;
}

export = IPostcssAutoprefixerHelper;
