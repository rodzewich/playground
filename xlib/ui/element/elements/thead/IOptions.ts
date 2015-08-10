/// <reference path="../IOptions.ts" />
/// <reference path="IElement.ts" />

module xlib.ui.element.elements.thead {

  export interface IOptions<T> extends elements.IOptions<T> {
    items?: elements.tr.IElement<T>[];
  }

}