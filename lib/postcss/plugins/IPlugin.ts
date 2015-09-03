interface IPlugin {
    isUsed():boolean;
    getIsUse():boolean;
    setIsUse(value:boolean):void;
    isEnabled(): boolean;
    getIsEnabled(): boolean;
    setIsEnabled(value:boolean): void;
    getInstance(): any;
}