/// <reference path="IFunction.ts" />
/// <reference path="IClass.ts" />
/// <reference path="IInterface.ts" />
/// <reference path="IVariable.ts" />
/// <reference path="IConstant.ts" />
/// <reference path="IEnum.ts" />

module xlib.tools.tsdoc.parser {

  export interface IParser {
    getFilename(): string;
    getEncoding(): string;
    getEncoding(value: string): void;
    getReferences(): string[];
    getFunctions(): IFunction[];
    getClasses(): IClass[];
    getInterfaces(): IInterface[];
    getVariables(): IVariable[];
    getConstants(): IConstant[];
    getEnums(): IEnum[];
    parse(callback?: (errors?: Error[]) => void): void;
  }

}