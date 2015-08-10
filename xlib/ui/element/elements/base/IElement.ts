/// <reference path="../IElement.ts" />

module xlib.ui.element.elements.base {

  export interface IElement<T> extends elements.IElement<T> {
    getHref(): string;
    setHref(value: string): void;
    getTarget(): string;
    setTarget(value: string): void;
  }

}