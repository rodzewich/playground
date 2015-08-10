/// <reference path="../IOptions.ts" />
/// <reference path="IElement.ts" />
/// <reference path="IListeners.ts" />

module xlib.ui.element.elements.input {

  export interface IOptions<T> extends elements.IOptions<T> {
    title?: any;
    lang?: any;
    xmlLang?: any;
    dir?: any;
    accessKey?: any;
    tabIndex?: any;
    type?: any;
    name?: any;
    value?: any;
    checked?: any;
    disabled?: any;
    size?: any;
    maxLength?: any;
    src?: any;
    alt?: any;
    useMap?: any;
    accept?: any;
    align?: any;
    autoComplete?: any;
    autoFocus?: any;
    border?: any;
    form?: any;
    formAction?: any;
    formEncType?: any;
    formMethod?: any;
    formNoValidate?: any;
    formTarget?: any;
    list?: any;
    max?: any;
    min?: any;
    multiple?: any;
    pattern?: any;
    placeholder?: any;
    readonly?: any;
    required?: any;
    listeners?: elements.input.IListeners<T>;
  }

}