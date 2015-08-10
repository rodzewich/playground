/// <reference path="./entity/IOptions.ts" />

module tools.generator.enums {

  import entity = enums.entity;

  export interface IOptions {
    name: any;
    title?: any;
    desc?: any;
    exports?: any;
    entities?: entity.IOptions[];
  }

}