/// <reference path="../IOptions.ts" />
/// <reference path="IElement.ts" />
/// <reference path="IListeners.ts" />

module xlib.ui.element.elements.colgroup {

  export interface IOptions<T> extends elements.IOptions<T> {
    title?: string;
    lang?: string;
    xmlLang?: string;
    dir?: string;
    span?: number;
    width?: string;
    align?: string;
    char?: string;
    charoff?: number;
    valign?: string;
    listeners?: elements.colgroup.IListeners<T>;
    items?: elements.col.IElement<T>[];
  }

}