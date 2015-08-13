export interface ICompiler {
    compile(filename:string, callback:(error?:Error, data?:any) => void): void;
}

//export = ICompiler;
