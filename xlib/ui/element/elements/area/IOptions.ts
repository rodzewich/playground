/// <reference path="../IOptions.ts" />
/// <reference path="IElement.ts" />
/// <reference path="IListeners.ts" />

module xlib.ui.element.elements.area {

  export interface IOptions<T> extends elements.IOptions<T> {
    title?: string;
    lang?: string;
    xmlLang?: string;
    dir?: string;
    shape?: string;
    coords?: number[];
    href?: string;
    noHref?: boolean;
    hrefLang?: string;
    alt?: string;
    tabIndex?: number;
    accessKey?: string;
    target?: string;
    type?: string;
    listeners?: elements.area.IListeners<T>;
  }

}