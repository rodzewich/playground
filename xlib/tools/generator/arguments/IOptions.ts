/// <reference path="../types/IOptions.ts" />

module tools.generator.arguments {

  import types = generator.types;

  export interface IOptions {
    name: any;
    type: types.IOptions;
    desc?: any;
    rest?: any;
    optional?: any;
    defaults?: any;
  }

}