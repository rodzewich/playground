/// <reference path="../types/IType.ts" />

module tools.generator.properties {

  import types = generator.types;

  export interface IOptions {
    statics?: any;
    name?: any;
    defaults?: any;
    type: types.IType;
    title: any;
    desc: any;
    access?: any;
  }

}