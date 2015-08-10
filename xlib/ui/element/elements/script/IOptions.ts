/// <reference path="../IOptions.ts" />
/// <reference path="IElement.ts" />
/// <reference path="IListeners.ts" />

module xlib.ui.element.elements.script {

  export interface IOptions<T> extends elements.IOptions<T> {
    charset?: any;
    type?: any;
    src?: any;
    defer?: any;
    xmlSpace?: any;
    async?: any;
    language?: any;
    listeners?: elements.script.IListeners<T>;
  }

}