/// <reference path="../IOptions.ts" />
/// <reference path="IElement.ts" />
/// <reference path="IListeners.ts" />

module xlib.ui.element.elements.dl {

  export interface IOptions<T> extends elements.IOptions<T> {
    title?: any;
    lang?: any;
    xmlLang?: any;
    dir?: any;
    listeners?: elements.dl.IListeners<T>;
    items?: (
      elements.dt.IElement<T> |
      elements.dd.IElement<T>
    )[];
  }

}