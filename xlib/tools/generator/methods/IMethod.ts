/// <reference path="../Access.ts" />
/// <reference path="../classes/IEntity.ts" />
/// <reference path="../arguments/IArgument.ts" />
/// <reference path="../arguments/Argument.ts" />

module tools.generator.methods {

  import Access  = generator.Access;
  import arguments = generator.arguments;
  import types   = generator.types;

  export interface IMethod extends classes.IEntity {
    getName(): string;
    getType(): types.IType;
    getTitle(): string;
    getLines(): string[];
    getStatics(): boolean;
    getAccess(): Access;
    getArguments(): arguments.IArgument[];
    getDesc(): string;
    setName(value: any): IMethod;
    setType(value: types.IType): IMethod;
    setTitle(value: any): IMethod;
    setStatics(value: any): IMethod;
    setAccess(value: Access): IMethod;
    setDesc(value: any): IMethod;
    isStatics(): boolean;
    addLine(value: any): IMethod;
    addArgument(argument: arguments.IArgument): IMethod;
    toString(): string;
  }

}