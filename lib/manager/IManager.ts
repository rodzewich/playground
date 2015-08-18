interface IManager {
    compile(filename:string, callback:(error?:Error, result:any) => void):void;
    connect(callback:(error?:Error) => void): void;
    disconnect(callback:(error?:Error) => void): void;
}

export = IManager;
