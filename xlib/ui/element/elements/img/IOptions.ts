/// <reference path="../IOptions.ts" />
/// <reference path="IElement.ts" />
/// <reference path="IListeners.ts" />

module xlib.ui.element.elements.img {

  export interface IOptions<T> extends elements.IOptions<T> {
    title?: any;
    lang?: any;
    xmlLang?: any;
    dir?: any;
    src?: any;
    alt?: any;
    longDesc?: any;
    height?: any;
    width?: any;
    useMap?: any;
    isMap?: any;
    listeners?: elements.img.IListeners<T>;
  }

}