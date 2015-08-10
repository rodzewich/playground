module tools.generator.types {

  export interface IType {
    getValue(): string;
    getArray(): boolean;
    isArray(): boolean;
    getArguments(): IType[];
    setValue(value: any): IType;
    setArray(value: any): IType;
    addArgument(value: IType): IType;
    toString(): string;
  }

}