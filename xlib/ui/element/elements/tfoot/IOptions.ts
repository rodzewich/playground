/// <reference path="../IOptions.ts" />
/// <reference path="IElement.ts" />
/// <reference path="IListeners.ts" />

module xlib.ui.element.elements.tfoot {

  export interface IOptions<T> extends elements.IOptions<T> {
    title?: any;
    lang?: any;
    xmlLang?: any;
    dir?: any;
    align?: any;
    char?: any;
    charOff?: any;
    bgColor?: any;
    vAlign?: any;
    listeners?: elements.tfoot.IListeners<T>;
    items?: elements.tr.IElement<T>[];
  }

}