/// <reference path="../classes/IEntity.ts" />
/// <reference path="../arguments/IArgument.ts" />

module tools.generator.constructors {

  import classes = generator.classes;
  import arguments = generator.arguments;

  export interface IConstructor extends classes.IEntity {
    getName(): string;
    getTitle(): string;
    setTitle(value: any): IConstructor;
    getDesc(): string;
    setDesc(value: any): IConstructor;
    addLine(value: any): IConstructor;
    getLines(): string[];
    addArgument(argument: arguments.IArgument): IConstructor;
    getArguments(): arguments.IArgument[];
    toString(): string;
  }

}
