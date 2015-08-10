/// <reference path="./IDecorator.ts" />

module form.element {

  export interface IOptions<T> {

    document  ?: Document;
    decorator ?: IDecorator;
    value   ?: T;

  }

}
