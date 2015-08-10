/// <reference path="../IOptions.ts" />
/// <reference path="IElement.ts" />

module xlib.ui.element.elements.head {

  export interface IOptions<T> extends elements.IOptions<T> {
    lang?: any;
    xmlLang?: any;
    dir?: any;
    profile?: any;
    items?: (
      elements.base.IElement<T> |
      elements.link.IElement<T> |
      elements.meta.IElement<T> |
      elements.object.IElement<T> |
      elements.script.IElement<T> |
      elements.style.IElement<T> |
      elements.title.IElement<T>
    )[];
  }

}