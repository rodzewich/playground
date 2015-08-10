/// <reference path="../IOptions.ts" />
/// <reference path="IElement.ts" />
/// <reference path="IListeners.ts" />

module xlib.ui.element.elements.textarea {

  export interface IOptions<T> extends elements.IOptions<T> {
    title?: any;
    lang?: any;
    xmlLang?: any;
    dir?: any;
    accessKey?: any;
    tabIndex?: any;
    name?: any;
    rows?: any;
    cols?: any;
    disabled?: any;
    readonly?: any;
    autoFocus?: any;
    form?: any;
    maxLength?: any;
    placeholder?: any;
    required?: any;
    wrap?: any;
    listeners?: elements.textarea.IListeners<T>;
  }

}