/// <reference path="../IElement.ts" />

module xlib.ui.element.elements.param {

  export interface IElement<T> extends elements.IElement<T> {
    getName(): string;
    setName(value: any): void;
    getValue(): string;
    setValue(value: any): void;
    getValueType(): string;
    setValueType(value: any): void;
    getType(): string;
    setType(value: any): void;
  }

}