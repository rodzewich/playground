interface ICompiler {
    compile(callback:(errors?:Error[], result?:any) => void): void;
}

export = ICompiler;
