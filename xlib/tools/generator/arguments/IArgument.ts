/// <reference path="../../../core.ts" />
/// <reference path="../types/IType.ts" />

module tools.generator.arguments {

  import types = generator.types;

  export interface IArgument extends xlib.IStringify {
    getName(): string;
    getDesc(): string;
    getType(): types.IType;
    getRest(): boolean;
    getDefaults(): string;
    getOptional(): boolean;
    isOptional(): boolean;
    isRest(): boolean;
    setName(value: any): IArgument;
    setDesc(value: any): IArgument;
    setType(value: types.IType): IArgument;
    setRest(value: any): IArgument;
    setOptional(value: any): IArgument;
    setDefaults(value: any): IArgument;
  }

}