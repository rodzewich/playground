/// <reference path="../IOptions.ts" />
/// <reference path="IElement.ts" />

module xlib.ui.element.elements.html {

  export interface IOptions<T> extends elements.IOptions<T> {
    lang?: any;
    xmlLang?: any;
    dir?: any;
    xmlNS?: any;
    items?: (
      elements.head.IElement<T> |
      elements.body.IElement<T>
    )[];
  }

}