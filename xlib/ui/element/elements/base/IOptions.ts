/// <reference path="../IOptions.ts" />
/// <reference path="IElement.ts" />

module xlib.ui.element.elements.base {

  export interface IOptions<T> extends elements.IOptions<T> {
    href?: string;
    target?: string;
  }

}