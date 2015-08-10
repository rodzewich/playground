/// <reference path="./loader/ILoader.ts" />

import ILoader = require("./loader/ILoader");

interface IModule {
    getCwd(): string;
    setCwd(value:string): void;
    resetCwd(): void;
    setLoader(value:ILoader): void;
    getLoader(): ILoader;
    load(module:string, dependency:string[], callback:(error?:Error, exports?:any) => void):void;
    register(module:string, exports:any): void;
    require(module:string): any;
}

export = IModule;
