/// <reference path="../IOptions.ts" />
/// <reference path="IElement.ts" />
/// <reference path="IListeners.ts" />

module xlib.ui.element.elements.option {

  export interface IOptions<T> extends elements.IOptions<T> {
    title?: any;
    lang?: any;
    xmlLang?: any;
    dir?: any;
    selected?: any;
    disabled?: any;
    label?: any;
    value?: any;
    listeners?: elements.option.IListeners<T>;
  }

}