/// <reference path="../IOptions.ts" />
/// <reference path="IElement.ts" />
/// <reference path="IListeners.ts" />

module xlib.ui.element.elements.select {

  export interface IOptions<T> extends elements.IOptions<T> {
    title?: any;
    lang?: any;
    xmlLang?: any;
    dir?: any;
    name?: any;
    size?: any;
    multiple?: any;
    disabled?: any;
    tabIndex?: any;
    accessKey?: any;
    autoFocus?: any;
    form?: any;
    required?: any;
    listeners?: elements.select.IListeners<T>;
    items?: (
      elements.optgroup.IElement<T> |
      elements.option.IElement<T>
    )[];
  }

}