/// <reference path="../IOptions.ts" />
/// <reference path="IElement.ts" />
/// <reference path="IListeners.ts" />

module xlib.ui.element.elements.param {

  export interface IOptions<T> extends elements.IOptions<T> {
    name?: any;
    value?: any;
    valueType?: any;
    type?: any;
    listeners?: elements.param.IListeners<T>;
  }

}