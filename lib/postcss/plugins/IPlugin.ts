interface IPlugin {
    isUsed():boolean;
    getIsUsed():boolean;
    setIsUsed(value:boolean):void;
    isEnabled(): boolean;
    getIsEnabled(): boolean;
    setIsEnabled(value:boolean): void;
    getInstance(): any;
}

export = IPlugin;