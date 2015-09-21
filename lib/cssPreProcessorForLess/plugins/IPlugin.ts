interface IPlugin {
    isUsed():boolean;
    getIsUsed():boolean;
    setIsUsed(value:boolean):void;
    getInstance():any;
}

export = IPlugin;