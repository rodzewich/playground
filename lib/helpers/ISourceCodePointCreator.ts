interface ISourceCodePointCreator {
    create(content:string, line:number, column:number): string;
}

export = ISourceCodePointCreator;
