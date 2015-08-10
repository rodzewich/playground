/// <reference path="../IOptions.ts" />
/// <reference path="IElement.ts" />
/// <reference path="IListeners.ts" />

module xlib.ui.element.elements.link {

  export interface IOptions<T> extends elements.IOptions<T> {
    title?: any;
    lang?: any;
    xmlLang?: any;
    dir?: any;
    charset?: any;
    href?: any;
    hrefLang?: any;
    type?: any;
    rel?: any;
    rev?: any;
    media?: any;
    sizes?: any;
    listeners?: elements.link.IListeners<T>;
  }

}