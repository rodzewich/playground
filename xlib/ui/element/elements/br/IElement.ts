/// <reference path="../IElement.ts" />

module xlib.ui.element.elements.br {

  export interface IElement<T> extends elements.IElement<T> {
    getTitle(): string;
    setTitle(value: string): void;
    getClear(): string;
    setClear(value: string): void;
  }

}