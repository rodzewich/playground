interface IPlugin {
    isUsed():boolean;
    getIsUsed():boolean;
    setIsUsed(value:boolean):void;
    getInstance():any;
    getType():string;
    getName():string;
}

export = IPlugin;