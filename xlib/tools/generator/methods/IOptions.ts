/// <reference path="../Access.ts" />
/// <reference path="../types/IType.ts" />
/// <reference path="../arguments/IArgument.ts" />

module tools.generator.methods {

  import Access  = generator.Access;
  import types   = generator.types;
  import arguments = generator.arguments;

  export interface IOptions {
    name?: any;
    type?: types.IType;
    title?: any;
    lines?: any[];
    static?: any;
    access?: Access;
    arguments?: arguments.IArgument[];
    desc?: any;
  }

}