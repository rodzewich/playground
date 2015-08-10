/// <reference path="../classes/IEntity.ts" />
/// <reference path="../types/IType.ts" />

module tools.generator.properties {

  import classes = generator.classes;
  import types = generator.types;

  export interface IProperty extends classes.IEntity {
    getType(): types.IType;
    getName(): string;
    getLines(): string[];
    getTitle(): string;
    getAccess(): string;
    getStatics(): boolean;
    getDefaults(): string;
    getDesc(): string;
    setType(value: types.IType): IProperty;
    setName(value: any): IProperty;
    setTitle(value: any): IProperty;
    setAccess(value: any): IProperty;
    setStatics(value: any): IProperty;
    setDefaults(value: any): IProperty;
    setDesc(value: any): IProperty;
    isStatics(): boolean;
    toString(): string;
  }

}