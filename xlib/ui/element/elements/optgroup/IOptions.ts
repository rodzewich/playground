/// <reference path="../IOptions.ts" />
/// <reference path="IElement.ts" />
/// <reference path="IListeners.ts" />

module xlib.ui.element.elements.optgroup {

  export interface IOptions<T> extends elements.IOptions<T> {
    title?: any;
    lang?: any;
    xmlLang?: any;
    dir?: any;
    disabled?: any;
    label?: any;
    listeners?: elements.optgroup.IListeners<T>;
    items?: elements.option.IElement<T>[];
  }

}