interface IManager {
    compile(filename:string, callback:(error?:Error, result:any) => void):void;
}

export = IManager;
