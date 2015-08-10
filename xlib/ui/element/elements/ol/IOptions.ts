/// <reference path="../IOptions.ts" />
/// <reference path="IElement.ts" />
/// <reference path="IListeners.ts" />

module xlib.ui.element.elements.ol {

  export interface IOptions<T> extends elements.IOptions<T> {
    title?: any;
    lang?: any;
    xmlLang?: any;
    dir?: any;
    type?: any;
    reversed?: any;
    start?: any;
    listeners?: elements.ol.IListeners<T>;
    items?: elements.li.IElement<T>[];
  }

}