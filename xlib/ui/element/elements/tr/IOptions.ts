/// <reference path="../IOptions.ts" />
/// <reference path="IElement.ts" />

module xlib.ui.element.elements.tr {

  export interface IOptions<T> extends elements.IOptions<T> {
    items?: (
      elements.td.IElement<T> |
      elements.th.IElement<T>
    )[];
  }

}