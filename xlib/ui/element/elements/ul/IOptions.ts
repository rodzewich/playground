/// <reference path="../IOptions.ts" />
/// <reference path="IElement.ts" />

module xlib.ui.element.elements.ul {

  export interface IOptions<T> extends elements.IOptions<T> {
    items?: elements.li.IElement<T>[];
  }

}