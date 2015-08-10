/// <reference path="../IElement.ts" />

module xlib.ui.element.elements.script {

  export interface IElement<T> extends elements.IElement<T> {
    getCharset(): string;
    setCharset(value: any): void;
    getType(): string;
    setType(value: any): void;
    getSrc(): string;
    setSrc(value: any): void;
    getDefer(): string;
    setDefer(value: any): void;
    getXmlSpace(): string;
    setXmlSpace(value: any): void;
    getAsync(): string;
    setAsync(value: any): void;
    getLanguage(): string;
    setLanguage(value: any): void;
  }

}