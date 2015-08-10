/// <reference path="../IOptions.ts" />
/// <reference path="IElement.ts" />
/// <reference path="IListeners.ts" />

module xlib.ui.element.elements.style {

  export interface IOptions<T> extends elements.IOptions<T> {
    lang?: any;
    xmlLang?: any;
    xmlSpace?: any;
    dir?: any;
    type?: any;
    media?: any;
    title?: any;
    listeners?: elements.style.IListeners<T>;
  }

}