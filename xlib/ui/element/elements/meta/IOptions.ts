/// <reference path="../IOptions.ts" />
/// <reference path="IElement.ts" />
/// <reference path="IListeners.ts" />

module xlib.ui.element.elements.meta {

  export interface IOptions<T> extends elements.IOptions<T> {
    lang?: any;
    xmlLang?: any;
    dir?: any;
    httpEquiv?: any;
    name?: any;
    content?: any;
    scheme?: any;
    listeners?: elements.meta.IListeners<T>;
  }

}